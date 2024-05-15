import {
  ScrollView,
  StyleSheet,
  View,
  ToastAndroid,
  Platform,
  Share,
} from "react-native";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Colors from "@/constants/Colors";
import Empty from "@/components/Empty";
import Item from "@/components/Item";
import TopBar from "@/components/TopBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MoreOptions from "@/components/MoreOptions";
import VersionUpdate from "@/components/VersionUpdate";

const Home = ({showUpdate}) => {
  const [list, setList] = useState([]);
  const [isMoreActive, setIsMoreActive] = useState(false);

  useEffect(() => {
    loadList();
  }, []);

  const saveList = async (items) => {
    try {
      await AsyncStorage.setItem("@list", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving list:", error);
    }
  };

  const loadList = async () => {
    try {
      const storedList = await AsyncStorage.getItem("@list");
      if (storedList !== null) {
        setList(JSON.parse(storedList));
      }
    } catch (error) {
      console.error("Error loading list:", error);
    }
  };

  const addItem = (newItem) => {
    if (newItem.trim() !== "") {
      const newList = [...list, newItem];
      setList(newList);
      saveList(newList);
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("List Item cannot be empty!", ToastAndroid.SHORT);
      } else {
        Toast.show({
          type: "error",
          text1: "List Item cannot be empty!",
          position: "bottom",
          bottomOffset: 100,
          visibilityTime: 800,
        });
      }
    }
  };

  const clearAll = () => {
    setList([]);
    saveList([]);
  };

  const deleteItem = (id) => {
    const newList = [...list];
    newList.splice(id, 1);
    setList(newList);
    saveList(newList);
  };

  const shareList = () => {
    try {
      const message = list
        .map((item, index) => `${index + 1}. ${item}`)
        .join("\n");

      const result = Share.share({
        message: `${"*List:* \n" + message}`,
      });
      if (result.Action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity of " + result.activityType);
        } else {
          console.log("Shared");
        }
      } else if (result.Action === Share.dismissedAction) {
        console.log("Dismissed");
      }
    } catch (error) {
      ToastAndroid.show("An Error Occured!", ToastAndroid.SHORT);
      console.error(error);
    }
  };

  const toggleMore = () => {
    setIsMoreActive(!isMoreActive);
  };

  return (
    <View style={styles.container}>
      <View>
        <MoreOptions
          isActive={isMoreActive}
          toggleMore={toggleMore}
          clearAll={clearAll}
          shareList={shareList}
          list= {list}
        />
        <VersionUpdate showUpdate={showUpdate} />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <TopBar total={list.length} toggleMore={toggleMore} />
        {list.length > 0 ? (
          <View style={styles.list}>
            {list.map((item, index) => {
              return (
                <Item
                  key={index}
                  text={item}
                  id={index}
                  deleteItem={deleteItem}
                />
              );
            })}
          </View>
        ) : (
          <Empty />
        )}
      </ScrollView>
      <Input addItem={addItem} />
      <View style={styles.toastWrapper}>
        <Toast />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 35,
  },
  list: {
    marginTop: 50,
    marginBottom: 95,
  },
  toastWrapper: {
    zIndex: 1,
  },
});
