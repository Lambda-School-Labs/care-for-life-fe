import React, { useState } from 'react';
import { StyleSheet, View, Button, AsyncStorage, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { ISSUER } from 'react-native-dotenv';
import config from '../okta/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/userActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch);
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

// configure as web platform to allow for Okta redirects
// if (Platform.OS === "web") {
//     WebBrowser.maybeCompleteAuthSession();
// }

const useProxy = true;

function App(props, { navigation }) {

    const discovery = AuthSession.useAutoDiscovery(ISSUER);

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        config,
        discovery
    );

    return (
        <View style={styles.container}>
            {props.user.validToken
                ? <Button title='logout' onPress={props.logout} />
                : <Button title='login' onPress={props.login} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);