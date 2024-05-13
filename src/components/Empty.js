import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const Empty = () => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/peep.png")} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={styles.heading}>Your List is Empty!</Text>
        <Text style={styles.secondary}>You don't have anything in your list. Try adding something.</Text>
      </View>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  image: {
    height: 220,
    aspectRatio: 0.9,
  },
  textWrapper: {
    width: "78%",
    marginVertical: 24,
  },
  heading:{
    fontFamily: 'Black',
    textAlign: 'center',
    fontSize: 30,
  },
  secondary: {
    fontFamily: 'Regular',
    textAlign: 'center',
    fontSize: 17,
    color: Colors.gray,
  }
});
