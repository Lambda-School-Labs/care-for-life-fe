import React, { useEffect, useState } from "react";
import { View, Text, Button, AsyncStorage, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import { getFamilies, setChosenFamilies } from "../actions/familyActions";
import { setCurrentFam, resetResponses } from "../actions/surveyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    // console.log("family state", state.familyReducer.families)
    return {
        chosenFamilies: state.familyReducer.chosenFamilies,
        stagedResponses: state.surveyReducer.stagedResponses
    };
};

function Chosen({ navigation, chosenFamilies, setCurrentFam, stagedResponses, resetResponses }) {

    useEffect(() => {

    }, [])

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    <Text>Chosen Families:</Text>
                    {chosenFamilies.map(i => {
                        return (
                            <CustomButton key={i.id} title={i.family_name} onPress={() => {
                                navigation.navigate('Family Members', { members: i.members, name: i.family_name });
                                setCurrentFam(i)
                            }} />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { resetResponses, setChosenFamilies, setCurrentFam })(Chosen);
