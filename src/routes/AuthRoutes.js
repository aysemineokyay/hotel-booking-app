import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/authScreens/LoginScreen";
import WelcomeScreen from "../screens/authScreens/WelcomeScreen";
import CreateAccountScreen from "../screens/authScreens/CreateAccountScreen";

const AuthRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={({ route }) => ({
        headerShadowVisible: false,
        headerTintColor: "black",
      })}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{ headerBackVisible: true, title: "" }}
      />
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
        options={{ headerBackVisible: true, title: "" }}
      />
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
