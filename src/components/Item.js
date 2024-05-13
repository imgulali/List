import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "@/constants/Colors";

const Item = ({ text, id, deleteItem }) => {
  const deleteItemHandler = () => {
    deleteItem(id);
  };

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? styles.pressedContainer : styles.container
      }
      onPress={deleteItemHandler}
    >
      <View style={styles.shape}></View>
      <View style={styles.content}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    width: "88%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 1.5,
    borderColor: Colors.input,
  },
  pressedContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    width: "88%",
    backgroundColor: Colors.input,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginVertical: 5,
    borderWidth: 1.5,
    borderColor: Colors.input,
  },
  shape: {
    width: 24,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    opacity:0.9,
  },
  content: {
    flex: 1,
    maxWidth: "90%",
    marginLeft: 15,
    paddingVertical: 10,
  },
  text: {
    fontSize: 19,
    fontFamily: "Medium",
    maxWidth: "100%",
  },
});

export default Item;
