import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/authScreens/LoginScreen";

const AuthRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={({ route }) => ({
        headerShadowVisible: false,
        headerTintColor: "black",
      })}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerBackVisible: true, title: "" }}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;

const styles = StyleSheet.create({});
