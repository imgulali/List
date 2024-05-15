import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import { versionApiCheck } from "@/api/versionAPI";
import { getHoursDifference } from "./VersionUtils";

export const versionCheck = async () => {
  try {
    const current = "1.0.2";
    const check = await AsyncStorage.getItem("version");

    if (!check) {
      await AsyncStorage.setItem(
        "version",
        JSON.stringify({ current, latest: null, lastUsed: null })
      );
    }

    let version = await AsyncStorage.getItem("version");
    version = JSON.parse(version);
    version.current = current;
    console.log(version);
    await AsyncStorage.removeItem("version");
    await AsyncStorage.setItem("version", JSON.stringify(version));

    if (version.latest) {
      return true;
    }

    const now = new Date().toISOString();
    let lastUsed = now;
    if (version.lastUsed) {
      lastUsed = version.lastUsed;
    }
    const hoursDifference = getHoursDifference(lastUsed, now);
    if (hoursDifference < 12 && version.lastUsed !== null) {
      return false;
    }

    const { res } = await versionApiCheck();
    if (!res.data.version) {
      return false;
    }

    let latest = res.data.version.version;
    if (current === latest) {
      latest = null;
    }
    const updated = JSON.stringify({
      current,
      latest,
      lastUsed: now,
    });

    await AsyncStorage.removeItem("version");
    await AsyncStorage.setItem("version", updated);
    if (!latest) {
      return false;
    }
    return true;
  } catch (error) {
    ToastAndroid.show("Error While Connecting", ToastAndroid.SHORT);
    console.error(error);
  }
};
