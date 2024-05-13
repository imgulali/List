import {
  ScrollView,
  StyleSheet,
  View,
  ToastAndroid,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import Colors from "@/constants/Colors";
import Empty from "@/components/Empty";
import Item from "@/components/Item";
import TopBar from "@/components/TopBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [list, setList] = useState([]);

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
    saveList(newList)
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <TopBar total={list.length} clearAll={clearAll} />
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
