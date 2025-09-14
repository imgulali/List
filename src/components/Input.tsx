import {
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  InteractionManager,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Colors from "@/constants/Colors";
import { useItemsContext } from "@/contexts/ItemsContext";
import { InputProps } from "@/types";

const Input = ({ editText, editId, onEditCancel, onAddItem }: InputProps) => {
  const [text, setText] = useState("");
  const { editItem } = useItemsContext();
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (editText) {
      setText(editText);
      InteractionManager.runAfterInteractions(() => {
        const focusInput = () => {
          if (textInputRef.current) {
            textInputRef.current.focus();
          }
        };
        
        setTimeout(focusInput, 200);
        setTimeout(focusInput, 500);
        setTimeout(focusInput, 800);
        setTimeout(focusInput, 1200);
      });
    }
  }, [editText]);

  const inputHandler = (input: string) => {
    setText(input);
  };

  const addItemHandler = () => {
    if (editId) {
      const success = editItem(editId, text);
      if (success) {
        setText("");
        if (onEditCancel) {
          onEditCancel();
        }
      }
    } else {
      const success = onAddItem!(text);
      if (success) {
        setText("");
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        ref={textInputRef}
        placeholder={editId ? "Edit item..." : "Write Something..."}
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
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.background,
    zIndex: 10,
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  input: {
    backgroundColor: Colors.input,
    padding: 5,
    borderRadius: 60,
    height: 60,
    width: "78%",
    paddingHorizontal: 24,
    fontSize: 17,
    fontWeight: "medium",
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  addBtn: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  pressedAddBtn: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: Colors.dark,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
  },
  addIcon: {
    height: 20,
    aspectRatio: 1,
  },
});