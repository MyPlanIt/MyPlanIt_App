import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const webview = useRef();
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const onPressHardwareBackButton = () => {
    if (isCanGoBack) {
      webview.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener(
      "hardwareBackPress",
      onPressHardwareBackButton
    );
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        onPressHardwareBackButton
      );
    };
  }, [isCanGoBack]);

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
        source={{ uri: "https://myplanit.site" }}
        ref={webview}
        injectedJavaScript={`
        (function() {
          function wrap(fn) {
            return function wrapper() {
              var res = fn.apply(this, arguments);
              window.ReactNativeWebView.postMessage(window.location.href);
              return res;
            }
          }
    
          history.pushState = wrap(history.pushState);
          history.replaceState = wrap(history.replaceState);
          window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage(window.location.href);
          });
        })();
    
        true;
      `}
        onMessage={({ nativeEvent: state }) => {
          console.log(state.data);
          if (state.data !== "https://www.myplanit.site/todo") {
            // Navigation state updated, can check state.canGoBack, etc.
            setIsCanGoBack(state.canGoBack);
            console.log(isCanGoBack);
          } else {
            setIsCanGoBack(false);
            console.log(isCanGoBack);
          }
        }}
      />
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
    </View>
  );
}
