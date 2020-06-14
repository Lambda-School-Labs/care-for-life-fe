import React, { useEffect, useState } from "react";
import axios from "axios"
import { View, Text, Button, AsyncStorage, ScrollView, TextInput } from "react-native";
import { Picker } from "@react-native-community/picker";
import styles from "../styles";
import { connect } from "react-redux";
import { fetchSurvey, addResponse, stageResponses } from "../actions/surveyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    return {
        survey_questions: state.surveyReducer.survey_questions,
        responses: state.surveyReducer.responses
    };
};

function Survey({ navigation, fetchSurvey, responses, survey_questions, addResponse, stageResponses }) {

    useEffect(() => {

        fetchSurvey()
            .then(res => {
                console.log("in the .then")
                survey_questions.map(i => {
                    console.log("survey_question", i)
                    addResponse({
                        question_id: 1,
                        response: "Latests and greatest",
                        completed_survey_id: 67,
                        family_id: 9,
                        individual_id: 10
                    })
                })
            })
    }, [])

    const submit = (e) => {
        console.log("responses:", responses)
        console.log("staging responses")
        // responses.map(i => {
        //     axios
        //         .post(`https://care-for-life.herokuapp.com/api/responses`, i)
        //         .then(res => {
        //             console.log("it posted")
        //         })
        //         .catch(err => {
        //             console.log("didnt work, heres why", err)
        //         })
        // })
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

export default connect(mapStateToProps, { fetchSurvey, addResponse, stageResponses })(Survey);