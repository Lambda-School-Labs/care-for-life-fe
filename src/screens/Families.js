import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import styles from "../styles";
import { connect, useSelector } from "react-redux";
import { getFamilies, setChosenFamilies } from "../actions/familyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    // console.log("family state", state.familyReducer.families)
    return {
        families: state.familyReducer.families,
        isLoading: state.familyReducer.isLoading,
        error: state.familyReducer.error
    };
};

function Families({ navigation, getFamilies, isLoading, error, families, setChosenFamilies }) {

    const [chosen, setChosen] = useState([])

    const responses = useSelector(state => state.surveyReducer.responses);

    useEffect(() => {
        getFamilies();
    }, []);

    const handleChange = (obj) => {
        chosen.includes(obj) ? null : setChosen([
            ...chosen,
            obj
        ])
    }

    const handleUnchange = (obj) => {
        setChosen([
            ...chosen.filter(i => {
                return i.family_name !== obj.family_name
            })
        ])
    }

    const nextScreen = () => {
        setChosenFamilies(chosen)
        navigation.navigate('Chosen Families')
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                {isLoading && <Text>Loading...</Text>}
                {error && <Text>{error}</Text>}
                <CustomButton onPress={nextScreen} title={"NEXT"} />
                <View>
                    <Text>Families:</Text>
                    {families.map(i => {
                        return (
                            <CustomButton key={i.id} onPress={() => handleChange(i)} title={i.family_name} />
                        )
                    })}
                </View>
                <View>
                    <Text>Chosen Families:</Text>
                    {chosen.map(i => {
                        return (
                            <CustomButton key={i.id} onPress={() => handleUnchange(i)} title={i.family_name} />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { getFamilies, setChosenFamilies })(Families);
