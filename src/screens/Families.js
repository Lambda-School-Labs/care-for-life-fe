import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";
import { connect } from 'react-redux';
import { getFamilies } from '../actions/familyActions';

const mapStateToProps = (state) => {
    console.log("state", state.familyReducer)
    return {
        families: state.familyReducer
    }
}

function FamiliesScreen(props) {

    useEffect(() => {
        props.getFamilies();
        console.log('prop', props)
    }, [])

    return (
        <View style={styles.screen}>
            {props.isLoading && <Text>Loading...</Text>}
            {props.error && <Text>{props.error.message}</Text>}
            {/* {props.families.map(i => {
                return (
                    <Button title={i.family_name} />
                )
            })} */}
        </View>
    );
}

export default connect(mapStateToProps, { getFamilies })(FamiliesScreen);