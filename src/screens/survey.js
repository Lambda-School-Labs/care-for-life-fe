import React, { useEffect, useState } from "react";
import axios from "axios"
import { View, Text, Button, AsyncStorage, ScrollView, TextInput } from "react-native";
import { Picker } from "@react-native-community/picker";
import styles from "../styles";
import { connect } from "react-redux";
import { fetchSurvey, addResponse, stageResponses, createCompletedSurvey } from "../actions/surveyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    return {
        survey_questions: state.surveyReducer.survey_questions,
        responses: state.surveyReducer.responses,
        user_id: state.userReducer.user.id,
        currentFamily: state.surveyReducer.currentFamily,
        currentCompSurvey: state.surveyReducer.currentCompSurvey
    };
};

function Survey({ navigation, fetchSurvey, responses, survey_questions, addResponse, stageResponses, createCompletedSurvey, user_id, currentFamily, currentCompSurvey }) {

    useEffect(() => {
        createCompletedSurvey({
            survey_id: 1,
            supervisor_id: user_id,
            family_id: currentFamily.id
        })
            .then(res => {
                fetchSurvey()
                    .then(res => {
                        console.log("in the .then")
                        survey_questions.map(i => {
                            console.log("survey_question", i)
                            addResponse({
                                question_id: i.id,
                                response: "Latests and greatest",
                                completed_survey_id: currentCompSurvey.id,
                                family_id: currentFamily.id,
                                individual_id: currentIndividual ? currentIndividual.id : null
                            })
                        })
                    })
            })
    }, [])

    const submit = (e) => {
        console.log("staging responses")
        stageResponses(responses);
        navigation.navigate('Chosen Families')
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    {survey_questions.map(i => {
                        return (
                            <View key={i.id}>
                                <Text>{i.question}?</Text>
                                <TextInput style={styles.textInput} />
                            </View>
                        )
                    })}
                    <CustomButton onPress={() => {
                        submit()
                    }} title={"Submit"} />
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { fetchSurvey, addResponse, stageResponses, createCompletedSurvey })(Survey);