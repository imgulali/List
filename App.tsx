import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Home from "@/screens/Home";
import { ItemsContextProvider } from "@/contexts/ItemsContext";

export default function App() {
  const [loaded, error] = useFonts({
    "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);


  if (!loaded && !error) {
    return null;
  }


  return (
    <>
      <ItemsContextProvider>
        <Home />
      </ItemsContextProvider>
      <StatusBar style="auto" />
    </>
  );
}
