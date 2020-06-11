import React, { useEffect, useState } from "react";
import { View, Text, Button, AsyncStorage, ScrollView } from "react-native";
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

function Chosen({ navigation, chosenFamilies }) {

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
                            <CustomButton key={i.id} title={i.family_name} onPress={() => {
                                AsyncStorage.setItem('famId', i.id),
                                    navigation.navigate('Family Members', { famId: i.id, members: i.members, name: i.family_name })
                            }} />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { setChosenFamilies })(Chosen);
