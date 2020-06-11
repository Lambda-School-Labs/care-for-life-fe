import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-community/picker";
import Button from "../components/Button";
import axios from "axios";
import styles from "../styles";
import pickerStyles from "../styles/Picker";

const Register = ({ route, navigation }) => {
  const { userInfo } = route.params;

  const [zones, setZones] = useState({});
  const [roles, setRoles] = useState([]);
  const [comms, setComms] = useState([]);
  const [user, setUser] = useState({
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    email: userInfo.email,
    role_name: "",
    zone_id: 0,
    community_id: 0,
  });

  const getRegisterInfo = () => {
    axios
      .get("https://care-for-life.herokuapp.com/api/roles")
      .then((res) => {
        console.log("roles", res.data);
        setRoles(res.data);
        axios
          .get("https://care-for-life.herokuapp.com/api/communities")
          .then((response) => {
            console.log(response.data);
            setComms(response.data);
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    console.log("user", userInfo);
    getRegisterInfo();
  }, []);

  return (
    <View style={styles.screen}>
      <Text>Select Your Role:</Text>
      <Picker
        style={pickerStyles.picker}
        selectedValue={user.role_id}
        onValueChange={(item) => setUser({ ...user, role_name: item })}
      >
        {roles.map((e, i) => {
          return <Picker.Item key={i} label={e.role} value={e.role} />;
        })}
      </Picker>
      <Text>Select Your Community:</Text>
      <Picker
        style={pickerStyles.picker}
        selectedValue={user.community_id}
        onValueChange={(item) => {
          setZones(comms.filter((e) => e.id === item));
          setUser({ ...user, community_id: item });
        }}
      >
        {comms.map((e, i) => {
          return <Picker.Item key={i} label={e.community} value={e.id} />;
        })}
      </Picker>
      <Button
        title="Next"
        onPress={() =>
          navigation.navigate("Register2", { zones: zones, user: user })
        }
      />
    </View>
  );
};

export default Register;

// get user info in props
// collect role_name, community, then zone
// store all in a state object to post to backend e
