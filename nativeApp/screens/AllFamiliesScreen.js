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
import Modal from "react-native-modal";
import { ApolloConsumer } from "react-apollo";

const AllFamiliesScreen = ({ navigation }) => {
  // Pull all families from the database and display them.
  // Selecting a family will take you to the family screen

  const [families, setFamilies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [familyName, setFamilyName] = useState({ name: "" });

  // Gets data in async storage
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("FAMILIES");
      if (value === null || value.length === 0) {
        // No data, initialize families to an empty array
        setFamilies([]);
        return;
      } else {
        // There is data, set it to state
        console.log("You have families", value);
        setFamilies(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  // Sets data to async storage, expects an array
  const setData = async (familyArr) => {
    try {
      await AsyncStorage.setItem("FAMILIES", JSON.stringify(familyArr));
      console.log("saved fam");
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  // Runs when the app first starts and will add any families in storage to state so they will be displayed
  useEffect(() => {
    retrieveData();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleChange = (text) => {
    setFamilyName({ ...familyName, name: text });
  };
  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      if (token !== null) {
        // We have data!!
        console.log("removing token:", token);
        await AsyncStorage.removeItem("TOKEN")
          .then((res) => console.log("removed token:", res))
          .catch((err) => console.log(err));
        //navigate to Login if token successfully removed
        navigation.navigate("Login");
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const handleSubmit = async () => {
    if (!familyName.name) {
      toggleModal();
      return;
    }
    // Set async storage to the families already in state including the the family being added
    setData([...families, familyName]);
    // We
    retrieveData();

    try {
      await addFamily({
        variables: {
          familyName: familyName.name,
        },
      });
    } catch (error) {
      if (error.offline) {
        error
          .watchOfflineChange()
          .then((res) => console.log("Offline result", res));
      }
      console.log(error);
    }

    setFamilyName({ name: "" });
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
      <View style={styles.modalContainer}>
        <Button title="ADD FAMILY" onPress={toggleModal} />
        <Button title="Logout" onPress={handleLogout} />
        <Button
          title="remove all"
          color="red"
          onPress={async () => {
            try {
              await AsyncStorage.removeItem("FAMILIES");
              retrieveData();
              console.log("removed");
            } catch (err) {
              console.log(err);
            }
          }}
        />
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
    backgroundColor: "white",
  },
});

export default AllFamiliesScreen;
