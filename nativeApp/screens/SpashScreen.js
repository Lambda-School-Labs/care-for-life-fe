import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const SplashScreen = () => (
  <View style={styles.container}>
    {/* Care For Life logo here */}
    <ActivityIndicator />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SplashScreen;
