import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const TopBar = ({ total, toggleMore }) => {
  const moreHandler = () => {
    toggleMore();
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.heading}>Your List</Text>
        <Text style={styles.secondary}>{total} things in total</Text>
      </View>
      <Pressable onPress={moreHandler} style={styles.moreWrapper}>
        <Image
          source={require("@/assets/icons/more-icon.png")}
          style={styles.more}
        />
      </Pressable>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "88%",
    alignSelf: "center",
    marginTop: 25,
  },
  heading: {
    fontSize: 34,
    fontFamily: "Black",
  },
  secondary: {
    fontSize: 18,
    fontFamily: "Medium",
    color: Colors.gray,
  },
  moreWrapper: {
    backgroundColor: Colors.input,
    height: 60,
    width: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
  },
  more: {
    height: 30,
    aspectRatio: 1,
  },
});
