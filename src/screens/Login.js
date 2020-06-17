import React, { useState } from "react";
import { View, Button, AsyncStorage, Alert, StyleSheet } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { ISSUER } from "react-native-dotenv";
import config from "../okta/index";
import styles from "../styles";
import { connect } from "react-redux";
import { resetResponses } from "../actions/surveyActions";
import CustomButton from "../components/Button";

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    };
};

//configure as web platform to allow for Okta redirects
if (Platform.OS === "web") {
    WebBrowser.maybeCompleteAuthSession();
}
const useProxy = true;

function Login({ navigation, resetResponses }) {
    const [validToken, setValidToken] = useState();
    const [idToken, setIdToken] = useState('');
    const [accessToken, setAccessToken] = useState('');

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
                    console.log('already logged in');
                    setValidToken(true);
                    //Navigates to Home Screen
                    navigation.navigate('Home', { idToken: idToken, accessToken: accessToken });
                } else {
                    //Gets New Token
                    // console.log('config:', config);
                    await promptAsync({ useProxy }).then((res) => {
                        console.log('res', res)
                        AsyncStorage.setItem("id_token", res.params.id_token);
                        setValidToken(true);
                        setIdToken(res.params.id_token);
                        setAccessToken(res.params.access_token)
                        // console.log("access token:", accessToken)
                        //navigates to home screen
                        navigation.navigate('Home', { idToken: idToken, accessToken: accessToken });
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const handleLogout = () => {
        console.log("logging out");
        resetResponses();
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
                    <CustomButton
                        title="Go to Home"
                        onPress={() => navigation.push("Home")}
                    />
                    <CustomButton title="Logout" onPress={handleLogout} />
                </View>
            ) : (
                    <View>
                        <CustomButton title="Login" onPress={handleLogin} />
                    </View>
                )}
        </View>
    );
}

export default connect(mapStateToProps, { resetResponses })(Login);
