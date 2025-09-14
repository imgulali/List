import {
  ScrollView,
  StyleSheet,
  View,
  ToastAndroid,
  Platform,
  Share,
} from "react-native";
import React, { useState } from "react";
import Input from "@/components/Input";
import Colors from "@/constants/Colors";
import Empty from "@/components/Empty";
import Item from "@/components/Item";
import TopBar from "@/components/TopBar";
import MoreOptions from "@/components/MoreOptions";
import ItemModal from "@/components/ItemModal";
import { useItemsContext } from "@/contexts/ItemsContext";

const Home = () => {
  const { list, addItem, deleteItem, clearAll } = useItemsContext();
  const [isMoreActive, setIsMoreActive] = useState(false);
  const [editState, setEditState] = useState<{ text: string; id: string } | null>(null);

  const handleAddItem = (newItem: string) => {
    const ok = addItem(newItem);
    if (!ok) {
      if (Platform.OS === "android") {
        ToastAndroid.show("List Item cannot be empty!", ToastAndroid.SHORT);
      } else {
        console.log("List Item cannot be empty!");
      }
    }
    return ok;
  };

  const handleEditItem = (text: string, id: string) => {
    setEditState({ text, id });
  };

  const handleEditCancel = () => {
    setEditState(null);
  };

  const shareList = async () => {
    try {
      const message = list
        .map((item, index) => `${index + 1}. ${item.text}`)
        .join("\n");

      await Share.share({ message: `*List:*\n${message}` });
    } catch (error) {
      ToastAndroid.show("An Error Occurred!", ToastAndroid.SHORT);
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MoreOptions
        isActive={isMoreActive}
        toggleMore={() => setIsMoreActive(!isMoreActive)}
        shareList={shareList}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TopBar total={list.length} toggleMore={() => setIsMoreActive(!isMoreActive)} />
        {list.length > 0 ? (
          <View style={styles.list}>
            {list.map((item) => (
              <Item 
                key={item.id} 
                text={item.text} 
                id={item.id} 
                onEdit={handleEditItem}
              />
            ))}
          </View>
        ) : (
          <Empty />
        )}
      </ScrollView>

      <ItemModal
        isVisible={editState !== null}
        text={editState?.text || ""}
        onClose={handleEditCancel}
      />
      
      <Input 
        editText={editState?.text}
        editId={editState?.id}
        onEditCancel={handleEditCancel}
        onAddItem={handleAddItem}
      />
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
});