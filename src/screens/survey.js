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
        user_id: state.userReducer.user_id,
        currentFamily: state.surveyReducer.currentFamily,
        currentCompSurvey: state.surveyReducer.currentCompSurvey,
        currentIndividual: state.surveyReducer.currentIndividual
    };
};

function Survey({ navigation, fetchSurvey, responses, survey_questions, addResponse, stageResponses, createCompletedSurvey, user_id, currentFamily, currentCompSurvey, currentIndividual }) {

    useEffect(() => {
        // console.log("survey_questions", survey_questions)
        console.log("current individual", currentIndividual)
        console.log("responses at start", responses)

        createCompletedSurvey({
            survey_id: 1,
            supervisor_id: user_id,
            family_id: currentFamily.id
        })
            .then(res => {
                fetchSurvey()
                    .then(async res => {
                        console.log("in the .then")
                        survey_questions && survey_questions.map(async i => {
                            // console.log("survey_question", i)
                            console.log("adding response")
                            addResponse({
                                question_id: i.id,
                                response: "Latests and greatest",
                                completed_survey_id: currentCompSurvey.id,
                                family_id: currentFamily.id,
                                individual_id: currentIndividual ? currentIndividual.id : null
                            })
                        })
                    })
                    .then(res => {
                        console.log("All responses", responses)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const submit = (e) => {
        responses.map(i => {
            axios
                .post(`https://care-for-life.herokuapp.com/api/responses`, i)
                .then(res => {
                    console.log("Its working!", res)
                })
                .catch(err => {
                    console.log("Nope!", err)
                })
        })
        navigation.navigate('Chosen Families')
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    {survey_questions ? survey_questions.map(i => {
                        return (
                            <View key={i.id}>
                                <Text>{i.question}?</Text>
                                <TextInput style={styles.textInput} />
                            </View>
                        )
                    }) : null}
                    <CustomButton onPress={() => {
                        submit()
                    }} title={"Submit"} />
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { fetchSurvey, addResponse, stageResponses, createCompletedSurvey })(Survey);