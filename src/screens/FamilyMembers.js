import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import { getFamilies, setChosenFamilies } from "../actions/familyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    // console.log("family state", state.familyReducer.families)
    return {
        chosenFamilies: state.familyReducer.chosenFamilies
    };
};

function FamilyMembers({ navigation }) {

    useEffect(() => {
        console.log(chosenFamilies)
    }, [])

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    <Text>Chosen Families:</Text>
                    {chosenFamilies.map(i => {
                        return (
                            <CustomButton key={i.id} title={i.family_name} />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, {})(FamilyMembers);
