import React, { useEffect, useState } from "react";
import { View, Text, Button, AsyncStorage, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import CustomButton from "../components/Button";
import { setCurrentIndividual } from "../actions/surveyActions";

const mapStateToProps = (state) => {
    // console.log("family state", state.familyReducer.families)
    return {
        chosenFamilies: state.familyReducer.chosenFamilies,
        stagedResponses: state.surveyReducer.stagedResponses,
        currentFam: state.surveyReducer.currentFamily
    };
};

function FamilyMembers({ navigation, route, setCurrentIndividual, currentFam, stagedResponses }) {

    const { members } = route.params;
    const { name } = route.params;

    useEffect(() => {
        console.log("current family", currentFam.family_name)
        console.log("staged responses", stagedResponses)
    }, [])

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    <Text>{name} Family Members:</Text>
                    {members.map(i => {
                        return (
                            <CustomButton key={i.id} onPress={() => {
                                setCurrentIndividual(i)
                                navigation.navigate("Survey")
                            }} title={`${i.first_name} ${i.last_name}`} />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { setCurrentIndividual })(FamilyMembers);
