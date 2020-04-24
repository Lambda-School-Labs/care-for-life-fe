import React, { Component } from "react";
import { View } from "react-native";
import tokenClient from "../api/TokenClient";
import { Button, Text } from "react-native";
// Then let’s create our class called index and add some state to it, our first function will be using async + await to check if the token client is authenticated or not.
export default class Index extends Component {
  state = {
    authentication: false, // Setting the original state to be false value.
  };
  checkAuthentication = async () => {
    const { authentication } = this.state;
    const authenticated = await tokenClient.isAuthenticated();
    // We are storing this promise into authenticated then it will return a boolean based on if the user is a token client or not. The current “const authenticated” will always be false unless the user is true.
    if (authenticated !== authentication) {
      this.setState({ authentication: authenticated });
      // Now we are storing the old state of authentication into our new authenticated variable based on if the user is token client or not.
    }
  };
  // Right after this we call componentDidMount to await until the authentication is true and a login function that returns a promise of the clients “access_token” and “id_token”.
  async componentDidMount() {
    await this.checkAuthentication();
  }
  logIn = async () => {
    await tokenClient
      .signInWithRedirect()
      .then((res) => {
        console.log("Success", res);
      })
      .catch((err) => {
        console.log("Error", err);
      });
    this.checkAuthentication();
  };
  // We can’t forget to log out!
  logOut = async () => {
    await tokenClient.signOut();
    this.checkAuthentication();
  };
  // Last but not least, we are grabbing back our original state from before and creating an if or else statement with a (ternary) operator.
  render() {
    const { authentication } = this.state;
    // Deconstructing using brackets allows us to write “authentication” instead of “this.state.authentication”
    return (
      <View>
        {/* This essentially reads like this: if the authentication statement is true, then take me to the welcome page or else. If it’s false, take me to the sign in page. */}
        {authentication ? (
          <View>
            <Text>Welcome!</Text>
            <Button
              title="Sign Out"
              onPress={async () => {
                this.logOut();
              }}
            />
          </View>
        ) : (
          // Or else
          <View style={{ padding: 100 }}>
            <Button
              title="Sign In"
              onPress={async () => {
                this.logIn();
              }}
            />
          </View>
        )}
      </View>
    );
  }
}
