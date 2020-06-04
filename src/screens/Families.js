import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";
import { connect } from 'react-redux';
import { getFamilies } from '../actions/familyActions';

const mapStateToProps = (state) => {
    // console.log("family state", state.familyReducer.families)
    return {
        families: state.familyReducer.families,
        isLoading: state.familyReducer.isLoading,
        error: state.familyReducer.error
    }
}

function FamiliesScreen(props) {

    useEffect(() => {
        props.getFamilies();
    }, [])

    return (
        <View style={styles.screen}>
            {props.isLoading && <Text>Loading...</Text>}
            {props.error && <Text>{props.error}</Text>}
            {props.families ? props.families.map(i => {
                return (
                    <Button key={i.id} title={i.family_name} />
                )
            }) : null}
        </View>
    );
}

export default connect(mapStateToProps, { getFamilies })(FamiliesScreen);