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
      <Text>Which familiy member is taking the survey?</Text>
      <FlatList
        data={familyMembers}
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
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Add a Family Member</Text>
            <TextInput
              value={memberName.name}
              onChangeText={(text) => handleChange(text)}
              name="name"
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

export default FamilyMembers;
