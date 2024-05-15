import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Network from "expo-network";
import AppLoading from "@/screens/AppLoading";
import Home from "@/screens/Home";
import { versionCheck } from "@/utils/VersionCheck";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isConnected, setIsConnected] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const checkNetwork = async () => {
      const networkState = await Network.getNetworkStateAsync();
      setIsConnected(networkState.isConnected);
    };
    checkNetwork();
  }, []);

  useEffect(() => {
    if (isConnected !== null) {
      const checkVersion = async () => {
        const res = await versionCheck();
        console.log(res);
        setShowUpdate(res);
      };
      checkVersion();
    }
  }, [isConnected]);

  const [fontsLoaded, fontError] = useFonts({
    Regular: require("@/assets/fonts/Regular.ttf"),
    Medium: require("@/assets/fonts/Medium.ttf"),
    Bold: require("@/assets/fonts/Bold.ttf"),
    Black: require("@/assets/fonts/Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <AppLoading />;
  }
  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Home showUpdate={showUpdate} />
      <StatusBar style="dark" />
    </View>
  );
}
