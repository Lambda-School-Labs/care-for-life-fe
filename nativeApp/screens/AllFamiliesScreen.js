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
  // Button to add a family to database
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
  console.log(families);
  console.log(familyName);
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
              style={styles.container}
            >
              <Card style={styles.card}>
                <Text>{data.item.name}</Text>
              </Card>
            </TouchableOpacity>
          );
        }}
      />
      <View style={{ flex: 1 }}>
        <Button title="Show modal" onPress={toggleModal} />
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "cyan",
            }}
          >
            <Text>Add a Family</Text>
            <TextInput
              value={familyName.name}
              onChangeText={(text) => handleChange(text)}
              name="name"
              style={{ backgroundColor: "white", width: "80%" }}
            />
            <Button title="Hide modal" onPress={handleSubmit} />
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    marginVertical: 10,
    width: "80%",
  },
});

export default AllFamiliesScreen;
