import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../components/Card";
import { personSurvey } from "../surveys/personSurvey";
import Modal from "react-native-modal";

const FamilyMembers = ({ navigation, route }) => {
  // Display all family members for the respective family
  const [familyMembers, setFamilyMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [memberName, setMemberName] = useState({ name: "" });

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
    setFamilyMembers([...familyMembers, memberName]);
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
