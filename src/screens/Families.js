import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import { getFamilies, setChosenFamilies } from "../actions/familyActions";
import CustomButton from "../components/Button";
import CustomCard from "../components/Card";

const mapStateToProps = (state) => {
    return {
        families: state.familyReducer.families,
        isLoading: state.familyReducer.isLoading,
        error: state.familyReducer.error
    };
};

function Families({
    navigation,
    getFamilies,
    isLoading,
    error,
    families,
    setChosenFamilies,
}) {
    /// temporary local state for chosen families
    const [chosen, setChosen] = useState([]);

    useEffect(() => {
        /// gets all families in users zone
        getFamilies();
    }, []);

    /// change handler for selecting a family
    const handleChange = (obj) => {
        chosen.includes(obj) ? null : setChosen([...chosen, obj]);
    };

    /// change handler for unselecting a family
    const handleUnchange = (obj) => {
        setChosen([
            ...chosen.filter((i) => {
                return i.family_name !== obj.family_name;
            }),
        ]);
    };

    const nextScreen = () => {
        /// stores chosen families in redux store
        setChosenFamilies(chosen);
        navigation.navigate("Chosen Families");
    };

    return (
        <ScrollView>
            <View style={styles.screen}>
                {isLoading && <Text>Loading...</Text>}
                {error && <Text>{error}</Text>}
                <CustomButton onPress={nextScreen} title={"NEXT"} />
                <View>
                    <Text>Families:</Text>
                    {families.map((i) => {
                        return (
                            <CustomCard
                                key={i.id}
                                onPress={() => handleChange(i)}
                                title={i.family_name}
                                source={require("../images/family.png")}
                            />
                        );
                    })}
                </View>
                <View>
                    <Text>Chosen Families:</Text>
                    {chosen.map((i) => {
                        return (
                            <CustomCard
                                key={i.id}
                                onPress={() => handleUnchange(i)}
                                title={i.family_name}
                                source={require("../images/family.png")}
                            />
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, { getFamilies, setChosenFamilies })(
    Families
);
