import React, { useEffect, useState } from "react";
import { View, Text, Button, AsyncStorage, ScrollView } from "react-native";
import styles from "../styles";
import { connect } from "react-redux";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    // console.log("family state", state.familyReducer.families)
    return {
        chosenFamilies: state.familyReducer.chosenFamilies
    };
};

function FamilyMembers({ navigation, members, famId }) {

    const [family, setFamily] = useState({})

    useEffect(() => {
        console.log("famId:", AsyncStorage.getItem('famId'))
        console.log("family:", family)
        // console.log("family set", family)
        // chosenFamilies.map(i => {
        //     if (i.id === AsyncStorage.getItem('famId')) {
        //         setFamily(i);
        //     } else {
        //         return null
        //     }
        // })
        // console.log(chosenFamilies)
    }, [family])

    const handleChange = () => {
        console.log("button hit")
    }

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View>
                    {/* <Text>{family.family_name} Family Members:</Text> */}
                    {members.map(i => {
                        return (
                            <CustomButton key={i.id} onPress={() => handleChange(i)} title={`${i.first_name} ${i.last_name}`} />
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

export default connect(mapStateToProps, {})(FamilyMembers);
