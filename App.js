import React, { useEffect } from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  BackHandler,
  Alert,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        { text: "확인", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return Platform.OS === "ios" ? (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]} backgroundColor="#FBFBFB">
      <WebView source={{ uri: "https://myplanit.site" }} />
      <StatusBar barStyle="dark-content" backgroundColor="#FBFBFB" />
    </SafeAreaView>
  ) : (
    <View style={{ flex: 1, marginTop: 30 }}>
      <WebView source={{ uri: "https://myplanit.site" }} />
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
    </View>
  );
}
