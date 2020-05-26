import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalStyles } from "../styles/Global";
import Card from "../components/Card";
import { MaterialIcons } from "@expo/vector-icons";
import AddFamilyForm from "./AddFamilyForm";
import CustomButton from "../components/Button";

export default function FamilyList({ navigation }) {
  const pressHandler = () => {
    navigation.push("FamilyMemberList");
  };

  const [modalOpen, setModalOpen] = useState(false);

  const [families, setFamilies] = useState([
    {
      name: "Family1",
      key: "1",
    },
    {
      name: "Family2",
      key: "2",
    },
    {
      name: "Family3",
      key: "3",
    },
  ]);

  const addFamily = (family) => {
    family.key = Math.random().toString();
    setFamilies((currentFamilies) => {
      return [...currentFamilies, family];
    });
    setModalOpen(false);
  };

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={styles.modalClose}
              onPress={() => setModalOpen(false)}
            />

            <AddFamilyForm addFamily={addFamily} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={globalStyles.titleText}>Family List Screen</Text>
      <FlatList
        data={families}
        //keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.push("FamilyMemberList", item)}
            >
              <Card>
                <Text style={globalStyles.titleText}>{item.name}</Text>
              </Card>
            </TouchableOpacity>
          );
        }}
      />

      <CustomButton title="Add Family" onPress={() => setModalOpen(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalClose: {
    margin: 10,
  },
  modalContent: {
    flex: 1,
  },
});
