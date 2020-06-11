import React, { useEffect, useState } from "react";
import { View, Text, Button, AsyncStorage, ScrollView } from "react-native";
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

    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log("on survey page")
        console.log("survey questions are here", survey_questions)
        // console.log(survey_questions)
        fetchSurvey()
    }, [count])

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    <CustomButton onPress={() => setCount(count + 1)} title={"press me"} />
                    {survey_questions.map(i => {
                        return (
                            <Text>{i.question}?</Text>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { fetchSurvey })(Survey);