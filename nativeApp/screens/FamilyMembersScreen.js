import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  AsyncStorage,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../components/Card";
import { personSurvey } from "../surveys/personSurvey";
import Modal from "react-native-modal";

const FamilyMembers = ({ navigation, route, setFamilies }) => {
  // Display all family members for the respective family
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [memberName, setMemberName] = useState({ name: "" });

  // Gets data in async storage
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("FAMILIES");

      const parsedValue = JSON.parse(value).find(
        (el) => el.name === route.params.familyName
      );

      if (parsedValue.members === null || parsedValue.members.length === 0) {
        // No data, initialize familyMembers to an empty array
        setFamilyMembers([]);
        return;
      } else {
        // There is data, set it to state
        console.log("You have family members", parsedValue);
        setFamilyMembers(parsedValue.members);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  // Sets data to async storage, expects an array
  const setData = (familyMemberArr) => {
    let familyObj = { name: route.params.familyName, members: familyMemberArr };
    AsyncStorage.getItem("FAMILIES")
      .then((res) => {
        let newFamiliesArr = JSON.parse(res).map((obj) =>
          familyObj.name === obj.name ? familyObj : obj
        );
        return newFamiliesArr;
      })
      .then((res) => {
        console.log("new family array", res);
        AsyncStorage.setItem("FAMILIES", JSON.stringify(res));
        retrieveData();
      })
      .catch((err) => console.log(err));
  };

  // Runs when the app first starts and will add any families in storage to state so they will be displayed
  useEffect(() => {
    retrieveData();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleChange = (text) => {
    setMemberName({ ...memberName, name: text });
  };

  const handleSubmit = () => {
    if (!memberName.name) {
      toggleModal();
      return;
    }

    setData([...familyMembers, memberName]);

    // Try catch block below for mutation

    setMemberName({ name: "" });
    toggleModal();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={familyMembers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(data) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Survey", {
                  personName: data.item.name,
                  survey: personSurvey,
                  type: "Person",
                  familyName: route.params.familyName,
                })
              }
              activeOpacity={0.7}
              style={styles.cardContainer}
            >
              <Card style={styles.card}>
                <Text>{data.item.name}</Text>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.modalContainer}>
        <Button
          title="ADD MEMBER"
          onPress={toggleModal}
          backdropOpacity={0.8}
        />
        <Button
          title="remove all"
          color="red"
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("FAMILY_MEMBERS");
              retrieveData();
              console.log("removed");
            } catch (err) {
              console.log(err);
            }
          }}
        />
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Member</Text>
            <TextInput
              placeholder="name"
              value={memberName.name}
              onChangeText={(text) => handleChange(text)}
              name="name"
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button color="red" title="Cancel" onPress={toggleModal} />
              </View>
              <View style={styles.button}>
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
  },
  card: {
    marginVertical: 10,
    width: "80%",
  },
  modalContainer: {
    justifyContent: "flex-end",
    backgroundColor: "#BADA22",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    color: "white",
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    padding: 10,
    width: "80%",
    marginBottom: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  button: {
    width: 100,
  },
});

export default FamilyMembers;
