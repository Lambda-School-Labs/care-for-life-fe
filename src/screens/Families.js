import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import styles from "../styles";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/familyActions';

const mapStateToProps = (state) => {
    return {
        families: state.familyReducer.families
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch);
}

function FamiliesScreen(props) {

    useEffect(() => {
        props.getFamilies();
        console.log('prop.families', props.families)
    }, [])

    return (
        <View style={styles.screen}>
            {props.families.map(i => {
                return (
                    <Button title={i.family_name} />
                )
            })}
        </View>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(FamiliesScreen);