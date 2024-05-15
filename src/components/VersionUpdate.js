import { StyleSheet, Text, View, Pressable, Linking } from "react-native";
import Modal from "react-native-modal";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VersionUpdate = ({ showUpdate }) => {
  const [currentVersion, setCurrentVersion] = useState("");
  const [newVersion, setNewVersion] = useState("");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const setValues = async () => {
      console.log("H"+showUpdate);
      setToggle(showUpdate);
      const get = await AsyncStorage.getItem("version");
      if (get !== null) {
        const version = JSON.parse(get);
        setCurrentVersion(version.current);
        setNewVersion(version.latest);
      }
    };

    setValues();
  }, [showUpdate]);

  const downloadHandler = () => {
    Linking.openURL(`${process.env.DOWNLOAD}`);
  }

  const closeHandler = () => {
    setToggle(false);
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={toggle}
      animationIn={"zoomIn"}
      animationOut={"zoomOut"}
      animationOutTiming={220}
    >
      <View style={styles.container}>
        <Pressable style={styles.itemWrapper}>
          <Text style={[styles.heading, { paddingTop: 30, height: 85 }]}>
            Hurray 🎉 there is a new update!
          </Text>
        </Pressable>
        <View style={styles.itemWrapper}>
          <Text style={styles.versionText}>
            Curent Version: {currentVersion}
          </Text>
          <Text style={styles.versionText}>New Version: {newVersion}</Text>
        </View>
        <View style={[styles.itemWrapper, styles.downloadWrapper]}>
          <Pressable style={styles.downloadBtn} onPress={downloadHandler}>
            <Text style={styles.downloadText}>Download</Text>
          </Pressable>
          <View
            style={[styles.downloadBtn, { backgroundColor: Colors.background }]}
          >
            <Text style={styles.closeText} onPress={closeHandler}>Close</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default VersionUpdate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    alignSelf: "center",
    width: "85%",
    borderRadius: 20,
  },
  itemWrapper: {
    height: 75,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Bold",
    fontSize: 18,
    maxWidth: "75%",
    textAlign: "center",
  },
  versionText: {
    fontFamily: "Bold",
    color: Colors.gray,
    fontSize: 16,
  },
  closeText: {
    fontFamily: "Black",
    fontSize: 16,
  },
  downloadWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 6,
  },
  downloadBtn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 60,
    backgroundColor: Colors.primary,
  },
  downloadText: {
    color: Colors.white,
    fontFamily: "Bold",
    fontSize: 16,
  },
});
