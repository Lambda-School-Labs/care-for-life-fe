import React, { useState } from 'react';
import {
  AsyncStorage,
  Alert,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useOfflineMutation } from 'react-offix-hooks';
import { signUpMutation } from '../Queries/queries';
import Card from '../components/Card';

const RegisterScreen = (props) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, state] = useOfflineMutation(signUpMutation);

  const handleSubmit = async () => {
    await signUp({
      variables: {
        // may need to update "employee_name" to match backend
        employee_name: fullName,
        username: username,
        password: password,
      },
    })
      .then((res) => {
        // may need to update token grab from response
        const token = res.data.login.token;
        AsyncStorage.setItem('token', token);
      })
      .catch((error) => {
        Alert.alert(
          'Error registering new user. Please check internet connection and credentials, then try again.'
        );
        console.log('Error registering user ', error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <TextInput
            placeholder="Full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Register" onPress={handleSubmit} />
          <View style={styles.footer}>
            <Text>Already have an account?</Text>
            <Button
              title="Login"
              onPress={() => props.navigation.replace('Login')}
            />
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
