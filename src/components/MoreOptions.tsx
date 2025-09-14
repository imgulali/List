import { Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import Modal from "react-native-modal";
import React from "react";
import Colors from "@/constants/Colors";
import { useItemsContext } from "@/contexts/ItemsContext";
import { MoreOptionsProps } from "@/types";
import Text from "@/components/Text";

const MoreOptions = ({ isActive, toggleMore, shareList }: MoreOptionsProps) => {
  const { list, clearAll } = useItemsContext();
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
      isVisible={isActive}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationOutTiming={220}
      backdropOpacity={0.5}
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
    fontWeight: "medium",
    fontSize: 18,
    textAlign: "center",
  },
  closeText: {
    fontWeight: "bold",
    color: Colors.primary,
  },
  creditWrapper: {
    borderBottomWidth: 0,
    height: 50,
  },
  creditText: {
    fontSize: 14,
    color: Colors.gray,
  },
});