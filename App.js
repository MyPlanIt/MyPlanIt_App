import React, { Component } from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <>
      <SafeAreaView
        style={{ flex: "1", backgroundColor: "#FBFBFB" }}
        edges={["top"]}
      >
        <WebView
          source={{ uri: "https://myplanit.site" }}
          // userAgent="Mozilla/5.0 (IPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15(KHTML, like Gecko) CriOS/80.0.3987.95 Mobile/15E148 Safari/604.1"
        />
        <StatusBar barStyle="dark-content" backgroundColor="#FBFBFB" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0,
  },
});
