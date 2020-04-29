import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  AsyncStorage,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../components/Card";
import { personSurvey } from "../surveys/personSurvey";
import Modal from "react-native-modal";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FamilyMembers = ({ navigation, route }) => {
  // Display all family members for the respective family
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [member, setMember] = useState({ id: 0, name: "" });

  const familyId = route.params.familyId;
  const familyName = route.params.familyName;

  const retrieveData = async () => {
    // Finds family in async storage
    try {
      // Get all families in async storage
      const value = await AsyncStorage.getItem("FAMILIES");
      // Find the family with the same id as the one passed via params
      const family = JSON.parse(value).find((obj) => obj.id === familyId);
      console.log("Family:", family);
      if (family.members === null || family.members.length === 0) {
        // No family members, initialize familyMembers state to an empty array
        setFamilyMembers([]);
        return;
      } else {
        // There are family members, set them to familyMembers state
        console.log("You have family members", family.members);
        setFamilyMembers(family.members);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
      // Alert.alert("There has been an error retrieving data, please try again");
    }
  };

  const setData = (familyMemberArr) => {
    // Sets data to async storage, expects an array
    // Create an updated family object with the new family members array
    let updatedFamily = {
      name: familyName,
      members: familyMemberArr,
      id: familyId,
    };
    // Get all families in async storage
    AsyncStorage.getItem("FAMILIES")
      .then((res) => {
        // Map through families and replace the old family object with the updated family object, return the updated array
        let newFamiliesArr = JSON.parse(res).map((obj) =>
          updatedFamily.name === obj.name ? updatedFamily : obj
        );
        return newFamiliesArr;
      })
      .then((res) => {
        // Set the updated array of families to async storage
        console.log("new family array", res);
        AsyncStorage.setItem("FAMILIES", JSON.stringify(res));
        // Set updated family members array to state
        setFamilyMembers(familyMemberArr);
      })
      .catch((err) => console.log(err));
  };

  const removeFamilyMember = (id) => {
    let updatedFamilyMembers = familyMembers.filter((obj) => obj.id !== id);
    setData(updatedFamilyMembers);
  };

  // Runs when the app first starts and will add any families in storage to state so they will be displayed
  useEffect(() => {
    retrieveData();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleChange = (text) => {
    setMember({ ...member, id: Math.random(), name: text });
  };

  const handleSubmit = () => {
    if (!member.name) {
      toggleModal();
      return;
    }

    setData([...familyMembers, member]);

    // Try catch block below for mutation

    setMember({ name: "" });
    toggleModal();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <FlatList
        data={familyMembers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(data) => {
          return (
            <View style={styles.container}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Survey", {
                    personName: data.item.name,
                    survey: personSurvey,
                    surveyName: "Individual Annual Survey",
                    familyName: familyName,
                  })
                }
                activeOpacity={0.7}
                style={styles.cardContainer}
              >
                <Card style={styles.card}>
                  <Text style={styles.cardText}>{data.item.name}</Text>
                </Card>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.deleteContainer}
                onPress={() => removeFamilyMember(data.item.id)}
              >
                <FontAwesome5 name="trash" size={30} color="white" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={toggleModal} style={styles.AddFamilyMember}>
          <Text style={styles.AddFamilyMemberText}>Add Family Member</Text>
        </TouchableOpacity>
        {/* <Button
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
        /> */}
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Member</Text>
            <TextInput
              placeholder="name"
              value={member.name}
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
  AddFamilyMember: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    color: "white",
    backgroundColor: "crimson",
  },
  AddFamilyMemberText: {
    color: "white",
    fontSize: 25,
  },
  container: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  cardContainer: {
    alignItems: "center",
    width: "80%",
    margin: 0,
    padding: 0,
  },
  card: {
    marginVertical: 10,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
  },
  cardText: {
    fontSize: 25,
  },
  editContainer: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: 100,
    marginTop: 10,
  },
  deleteContainer: {
    backgroundColor: "crimson",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: 100,
    marginTop: 10,
  },
  modalContainer: {
    justifyContent: "flex-end",
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
