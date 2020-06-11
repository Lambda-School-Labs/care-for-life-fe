import React, { useEffect, useState } from "react";
import { View, Text, Button, AsyncStorage, ScrollView, TextInput } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import { fetchSurvey } from "../actions/surveyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    return {
        survey_questions: state.surveyReducer.survey_questions
    };
};

function Survey({ navigation, fetchSurvey, survey_questions }) {

    useEffect(() => {
        console.log("on survey page")
        console.log("survey questions are here", survey_questions)
        fetchSurvey()
    }, [])

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    {survey_questions.map(i => {
                        return (
                            <View>
                                <Text>{i.question}?</Text>
                                <TextInput style={styles.textInput} />
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { fetchSurvey })(Survey);