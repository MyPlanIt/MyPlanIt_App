import React, { useEffect, useState, useRef } from "react";
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
  const webview = useRef(null);

  useEffect(() => {
    const backAction = () => {
      webview.current.goBack();
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
      <WebView
        userAgent={`Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Mobile/15E148 Safari/604.1`}
        source={{ uri: "https://myplanit.site" }}
      />
      <StatusBar barStyle="dark-content" backgroundColor="#FBFBFB" />
    </SafeAreaView>
  ) : (
    <View style={{ flex: 1, marginTop: 30 }}>
      <WebView
        userAgent={`Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Mobile Safari/537.36`}
        source={{ uri: "https://myplanit.site/todo" }}
        ref={webview}
      />
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
    </View>
  );
}
