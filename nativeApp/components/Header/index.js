import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground, Button } from 'react-native';


const Header = ({ navigation, title }) => {

  const openMenu = () => {
    navigation.openDrawer()
  }

  return (
    <View style={styles.header}>
      <Button
        title="OPEN"
        onPress={openMenu}
      />
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
      width: Dimensions.get('screen').width,
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      
  },
  headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#333',
      letterSpacing: 1
  },
  icon: {
      position: 'absolute',
      left: 16
  },
  headerTitle: {
      flexDirection: 'row',
  }
})

export default Header;