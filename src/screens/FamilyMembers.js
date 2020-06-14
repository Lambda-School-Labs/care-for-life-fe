import React, { useEffect, useState } from "react";
import { View, Text, Button, AsyncStorage, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    // console.log("family state", state.familyReducer.families)
    return {
        chosenFamilies: state.familyReducer.chosenFamilies,
        stagedResponses: state.surveyReducer.stagedResponses
    };
};

function FamilyMembers({ navigation, route, stagedResponses }) {

    const [family, setFamily] = useState({})
    const [member, setMember] = useState({})

    const { members } = route.params;
    const { name } = route.params;

    useEffect(() => {
        console.log("staged responses:", stagedResponses)
    }, [])

    const handleChange = (e) => {
        setMember(e)
        navigation.navigate("Survey")
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    <Text>{name} Family Members:</Text>
                    {members.map(i => {
                        return (
                            <CustomButton key={i.id} onPress={() => {
                                AsyncStorage.setItem('individual_id', i.id)
                                navigation.navigate("Survey")
                            }} title={`${i.first_name} ${i.last_name}`} />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, {})(FamilyMembers);
