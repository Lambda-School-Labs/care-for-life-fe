import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-community/picker";
import Button from "../components/Button";
import axios from "axios";
import styles from "../styles";
import pickerStyles from "../styles/Picker";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from '../actions/userActions';

const Register = ({ route, navigation }) => {
    const { user } = route.params;
    const { zones } = route.params;

    const [userInfo, setUserInfo] = useState(user);

    const storedUser = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log("***user", user);
    //     console.log("***zones", zones);

    // }, []);

    const handleSubmit = (user) => {
        dispatch(saveUser(userInfo))
        console.log('stored user from redux', storedUser)
        axios
            .post("https://care-for-life.herokuapp.com/api/workers", user)
            .then((res) => {
                console.log('from the post request', res.data);
                // add res.data.id to redux
            })
            .catch((err) => console.log(err.message));
    };

    return (
        <View style={styles.screen}>
            <Text>Select Your Zone:</Text>
            <Picker
                style={pickerStyles.picker}
                selectedValue={user.zone_id}
                onValueChange={(item) => setUserInfo({ ...user, zone_id: item })}
            >
                {zones[0].zones.map((e, i) => {
                    return <Picker.Item key={i} label={e.zone_letter} value={e.id} />;
                })}
            </Picker>
            <Button
                title="submit"
                onPress={() => {
                    console.log("*********", userInfo);
                    handleSubmit(userInfo);
                    navigation.navigate("Home")
                }}
            />
        </View>
    );
};

export default Register;
