import {
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";

const Input = ({ addItem }) => {
  const [text, setText] = useState("");

  const inputHandler = (input) => {
    setText(input);
  };

  const addItemHandler = () => {
    addItem(text);
    setText("");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        placeholder="Write Something..."
        placeholderTextColor={Colors.gray}
        cursorColor={Colors.primary}
        style={styles.input}
        value={text}
        onChangeText={inputHandler}
      />
      <Pressable
        style={({ pressed }) =>
          pressed ? styles.pressedAddBtn : styles.addBtn
        }
        onPress={addItemHandler}
      >
        <Image
          source={require("@/assets/icons/add-icon.png")}
          style={styles.addIcon}
        />
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 95,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.background,
  },
  input: {
    backgroundColor: Colors.input,
    padding: 5,
    borderRadius: 60,
    height: 60,
    width: "78%",
    paddingHorizontal: 24,
    fontSize: 17,
    fontFamily: "Medium",
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  pressedAddBtn: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.dark,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    height: 20,
    aspectRatio: 1,
  },
});
