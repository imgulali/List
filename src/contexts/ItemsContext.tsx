import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem, ItemsContextType, ItemsContextProviderProps } from "@/types";

// Create context with proper typing
const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const useItemsContext = () => {
  const context = useContext(ItemsContext);
  if (context === undefined) {
    throw new Error('useItemsContext must be used within an ItemsContextProvider');
  }
  return context;
};


export const ItemsContextProvider = ({ children }: ItemsContextProviderProps) => {
  const [list, setList] = useState<ListItem[]>([]);

  useEffect(() => {
    loadList();
  }, []);

  const saveList = async (items: ListItem[]) => {
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
        const parsedList = JSON.parse(storedList);
        // Convert createdAt strings back to Date objects
        const itemsWithDates = parsedList.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt)
        }));
        setList(itemsWithDates);
      }
    } catch (error) {
      console.error("Error loading list:", error);
    }
  };

  const addItem = (text: string): boolean => {
    if (text.trim() === "") return false;
    const newItem: ListItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: text.trim(),
      createdAt: new Date()
    };
    const newList = [...list, newItem];
    setList(newList);
    saveList(newList);
    return true;
  };

  const editItem = (id: string, newText: string): boolean => {
    if (newText.trim() === "") return false;
    const newList = list.map(item => 
      item.id === id ? { ...item, text: newText.trim() } : item
    );
    setList(newList);
    saveList(newList);
    return true;
  };

  const deleteItem = (id: string) => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    saveList(newList);
  };

  const clearAll = () => {
    setList([]);
    saveList([]);
  };

  const value: ItemsContextType = {
    list,
    addItem,
    editItem,
    deleteItem,
    clearAll,
  };

  return (
    <ItemsContext.Provider value={value}>{children}</ItemsContext.Provider>
  );
};