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
import Modal from "react-native-modal";

const AllFamiliesScreen = ({ navigation }) => {
  // Pull all families from the database and display them.
  // Selecting a family will take you to the family screen

  const [families, setFamilies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [familyName, setFamilyName] = useState({ name: "" });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleChange = (text) => {
    setFamilyName({ ...familyName, name: text });
  };

  const handleSubmit = () => {
    if (!familyName.name) {
      toggleModal();
      return;
    }
    setFamilies([...families, familyName]);
    setFamilyName({ name: "" });
    toggleModal();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={families}
        renderItem={(data) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Family", { familyName: data.item.name })
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
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button title="ADD FAMILY" onPress={toggleModal} />
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Family</Text>
            <TextInput
              placeholder="name"
              value={familyName.name}
              onChangeText={(text) => handleChange(text)}
              name="name"
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title="Submit" onPress={handleSubmit} />
              </View>
              <View style={styles.button}>
                <Button title="Cancel" onPress={toggleModal} />
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
    backgroundColor: "white",
  },
});

export default AllFamiliesScreen;
