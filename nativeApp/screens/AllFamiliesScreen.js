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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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
            <View style={styles.container}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.cardContainer}
                onPress={() =>
                  navigation.navigate("Family", {
                    familyName: data.item.name,
                    familyId: data.item.id,
                  })
                }
              >
                <Card style={styles.card}>
                  <Text style={styles.cardText}>{data.item.name}</Text>
                </Card>
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={0.7}
                style={styles.editContainer}
                onPress={() => console.log("pressed")}
              >
                <FontAwesome5 name="edit" size={30} color="white" />
              </TouchableOpacity> */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.deleteContainer}
                onPress={() => removeFamily(data.item.id)}
              >
                <FontAwesome5 name="trash" size={30} color="#9F1B37" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={toggleModal} style={styles.addFamilyButton}>
          <Text style={styles.addFamilyButtonText}>Add Family</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => AsyncStorage.removeItem("FAMILIES")}
          style={styles.addFamilyButton}
        >
          <Text style={styles.addFamilyButtonText}>Remove Families</Text>
        </TouchableOpacity> */}
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
                <Button color="#9F1B37" title="Cancel" onPress={toggleModal} />
              </View>
              <View style={styles.button}>
                <Button
                  color="forestgreen"
                  title="Submit"
                  onPress={handleSubmit}
                />
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
    backgroundColor: "#9F1B37",
  },
  addFamilyButtonText: {
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
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  cardText: {
    fontSize: 25,
    marginLeft: 10,
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: 100,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
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

export default AllFamiliesScreen;
