import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../actions/userActions.js';
import { StyleSheet, View, Button, AsyncStorage, Alert } from 'react-native';

export const removeToken = async () => {
    return await AsyncStorage.removeItem("access_token");
};
export const getToken = async () => {
    return await AsyncStorage.getItem("access_token");
};

let initialState = {
    user: {
        loggedIn: false,
        validToken: false
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log("loggin in...");
            getToken()
                .then(async (token) => {
                    console.log("Got Token:", token);
                    if (token !== null) {
                        //Check if token is valid
                        //Ping Backend to validate token

                        console.log('already logged in');
                        state.user.validToken = true;
                        //Navigates to Home Screen
                        navigation.navigate('Home');
                    } else {
                        //Gets New Token
                        console.log('config', config)
                        await promptAsync({ useProxy }).then((res) => {
                            AsyncStorage.setItem("access_token", res.params.access_token);
                            state.user.validToken = true;
                            //navigates to home screen
                            navigation.navigate('Home');
                        });
                    }
                })
                .catch((err) => console.log(err));
            return state;
        case LOGOUT_SUCCESS:
            console.log('logging out')
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
                            state.user.validToken = true;
                        },
                    },
                ],
                { cancelable: false }
            );
            return state;
        default:
            return state
    }
}