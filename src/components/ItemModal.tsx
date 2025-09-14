import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/Colors";
import { ItemModalProps } from "@/types";
import Text from "@/components/Text";


const ItemModal = ({ isVisible, text, onClose }: ItemModalProps) => {
  const handleBackdropPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={handleBackdropPress} />
      <View style={styles.modalContainer}>
        <View style={styles.itemContainer}>
          <View style={styles.shape}></View>
          <View style={styles.content}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 6,
  },
  itemContainer: {
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
    borderWidth: 1.5,
    borderColor: Colors.input,
  },
  shape: {
    width: 24,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 6,
    opacity: 0.9,
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

export default ItemModal;
