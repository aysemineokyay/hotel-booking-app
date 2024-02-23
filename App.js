import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Router from "./src/routes/Router";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import { ModalPortal } from "react-native-modals";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Router />
        <ModalPortal />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
