import { Pressable, StyleSheet, Text, View, BackHandler } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const AppLoading = () => {

  const exitHandler = () => {
    BackHandler.exitApp();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Oh Snap!</Text>
      <Text style={styles.secondary}>An error occured! Try restarting the app.</Text>
      <Pressable style={styles.closeBtn} onPress={exitHandler}>
        <Text style={styles.closeText}>Close App</Text>
      </Pressable>
    </View>
  )
}

export default AppLoading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
  },
  secondary: {
    fontSize:18,
    textAlign: 'center',
    maxWidth: "70%",
    marginTop: 5,
    color: Colors.gray,
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 60,
  },
  closeText: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
})