import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";

const MoreOptions = ({ isActive, toggleMore, clearAll, shareList, list }) => {
  const handleToggleMore = () => {
    toggleMore();
  };

  const handleClearAll = () => {
    clearAll();
    toggleMore();
  };
  const handleShareList = async () => {
    if (list.length > 0) {
      await shareList();
    } else {
      ToastAndroid.show("Cannot send empty List", ToastAndroid.SHORT);
    }
  };

  const clearShortPress = () => {
    ToastAndroid.show("Long Press to Clear", ToastAndroid.SHORT);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={isActive}
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      animationOutTiming={220}
    >
      <View style={styles.container}>
        <Pressable style={styles.optionWrapper} onLongPress={handleClearAll} onPress={clearShortPress}>
          <Text style={styles.optionText}>Clear All</Text>
        </Pressable>
        <Pressable style={styles.optionWrapper} onPress={handleShareList}>
          <Text style={styles.optionText}>Share</Text>
        </Pressable>
        <Pressable style={styles.optionWrapper} onPress={handleToggleMore}>
          <Text style={[styles.optionText, styles.closeText]}>Close</Text>
        </Pressable>
        <View style={[styles.optionWrapper, styles.creditWrapper]}>
          <Text
            style={[styles.optionText, styles.creditText]}
            onPress={handleToggleMore}
          >
            Made with ❤️ by Gul Ali
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default MoreOptions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    alignSelf: "center",
    width: "85%",
    borderRadius: 20,
  },
  optionWrapper: {
    height: 65,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0.75,
    borderColor: Colors.input,
  },
  optionText: {
    fontFamily: "Medium",
    fontSize: 18,
    textAlign: "center",
  },
  closeText: {
    fontFamily: "Black",
    color: Colors.primary,
  },
  creditWrapper: {
    borderBottomWidth: 0,
    height: 50,
  },
  creditText: {
    fontFamily: "Regular",
    fontSize: 14,
    color: Colors.gray,
  },
});
