import React, { useEffect, useState } from "react";
import { View, Text, Button, AsyncStorage, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import { getFamilies, setChosenFamilies } from "../actions/familyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    // console.log("family state", state.familyReducer.families)
    return {

    };
};

function Survey({ navigation, chosenFamilies }) {

    useEffect(() => {
        console.log(chosenFamilies)
    }, [])

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>

                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, {})(Survey);