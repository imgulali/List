import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import AppLoading from '@/screens/AppLoading';
import Home from '@/screens/Home';

SplashScreen.preventAutoHideAsync();

export default function App() {
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
    return <AppLoading />
  }
  return (
    <View onLayout={onLayoutRootView} style={{flex: 1}}>
      <Home />
      <StatusBar style="dark" />
    </View>
  );
}