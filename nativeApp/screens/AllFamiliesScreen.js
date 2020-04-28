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
import Modal from "react-native-modal";
import { ApolloConsumer } from "react-apollo";

const AllFamiliesScreen = ({ navigation }) => {
  // Pull all families from async storage and display them.
  // Selecting a family will take you to the family members screen

  const [families, setFamilies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFamily, setNewFamily] = useState({
    id: 0,
    name: "",
    members: [],
  });

  const retrieveData = async () => {
    // Checks for families in async storage
    try {
      const value = await AsyncStorage.getItem("FAMILIES");
      if (value === null || value.length === 0) {
        // If no families, initialize families state to an empty array
        setFamilies([]);
        return;
      } else {
        // Else, there are families, set them to the families state
        console.log("You have families", value);
        setFamilies(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
      Alert.alert("There has been an error retrieving data, please try again");
    }
  };

  const setData = () => {
    // Sets a new family to async storage
    // First check for families in async storage
    AsyncStorage.getItem("FAMILIES")
      .then((res) => {
        if (res === null) {
          // If no existing families initialize async storage "FAMILIES" to an array with first family inside
          // AsyncStorage requires it to be stringified
          AsyncStorage.setItem("FAMILIES", JSON.stringify([newFamily]));
          // Set families state to an array with first family inside
          setFamilies([newFamily]);
          return;
        }
        // If existing families:
        // Parse result
        let families = JSON.parse(res);
        // Create a new array of the existing families, adding the new family
        let newFamiliesArr = [...families, newFamily];
        // Set updated families array to async storage
        AsyncStorage.setItem("FAMILIES", JSON.stringify(newFamiliesArr));
        // Set updated families array to state
        setFamilies(newFamiliesArr);
      })
      .catch((err) => console.log(err));
  };

  const removeFamily = (id) => {
    AsyncStorage.getItem("FAMILIES")
      .then((res) => {
        let families = JSON.parse(res);
        let newFamiliesArr = families.filter((obj) => obj.id !== id);
        AsyncStorage.setItem("FAMILIES", JSON.stringify(newFamiliesArr));
        setFamilies(newFamiliesArr);
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
    setNewFamily({ ...newFamily, id: Math.random(), name: text, members: [] });
  };

  const handleSubmit = async () => {
    if (!newFamily.name) {
      toggleModal();
      return;
    }

    setData([...families, newFamily]);

    // try {
    //   await addFamily({
    //     variables: {
    //       newFamily: newFamily.name,
    //     },
    //   });
    // } catch (error) {
    //   if (error.offline) {
    //     error
    //       .watchOfflineChange()
    //       .then((res) => console.log("Offline result", res));
    //   }
    //   console.log(error);
    // }

    setNewFamily({ ...newFamily, name: "", members: [] });
    toggleModal();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={families}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(data) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Family", {
                  familyName: data.item.name,
                  familyId: data.item.id,
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
        <TouchableOpacity onPress={toggleModal} style={styles.addFamilyButton}>
          <Text style={styles.addFamilyButtonText}>Add Family</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Family</Text>
            <TextInput
              placeholder="name"
              value={newFamily.name}
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
  addFamilyButton: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    color: "white",
    backgroundColor: "black",
  },
  addFamilyButtonText: {
    color: "white",
    fontSize: 25,
  },
  cardContainer: {
    alignItems: "center",
  },
  card: {
    marginVertical: 10,
    width: "80%",
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
    backgroundColor: "white",
  },
});

export default AllFamiliesScreen;
