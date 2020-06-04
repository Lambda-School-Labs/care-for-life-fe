import React, { useState } from "react";
import { View, Button, AsyncStorage, Alert, StyleSheet } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { ISSUER } from "react-native-dotenv";
import config from "../okta/index";
// import styles from "../styles";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/userActions';

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch);
}

//configure as web platform to allow for Okta redirects
if (Platform.OS === "web") {
    WebBrowser.maybeCompleteAuthSession();
}
const useProxy = true;

function Login({ navigation }) {

    const [validToken, setValidToken] = useState();

    const discovery = AuthSession.useAutoDiscovery(ISSUER);

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        config,
        discovery
    );

    //  Get Token
    const removeToken = async () => {
        return await AsyncStorage.removeItem("access_token");
    };
    const getToken = async () => {
        return await AsyncStorage.getItem("access_token");
    };

    const handleLogin = () => {
        console.log("loggin in...");
        getToken()
            .then(async (token) => {
                console.log("Got Token:", token);
                if (token !== null) {
                    //Check if token is valid
                    //Ping Backend to validate token

                    console.log("already logged in");
                    setValidToken(true);
                    //Navigates to Home Screen
                    navigation.navigate("Home");
                } else {
                    //Gets New Token
                    console.log("config", config);
                    await promptAsync({ useProxy }).then((res) => {
                        AsyncStorage.setItem("access_token", res.params.access_token);
                        setValidToken(true);
                        //navigates to home screen
                        navigation.navigate("Home");
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const handleLogout = () => {
        console.log("logging out");
        Alert.alert(
            "Logging Out",
            "Are you sure you want to log out? \n You won't be able to sign back in while offline.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Canceled"),
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        removeToken();
                        setValidToken(false);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.screen}>
            {validToken ? (
                <View>
                    <Button title="Logout" onPress={handleLogout} />
                    <Button title="Go to Home" onPress={() => navigation.push("Home")} />
                </View>
            ) : (
                    <View>
                        <Button style={styles.button} title="Login" onPress={handleLogin} />
                    </View>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
