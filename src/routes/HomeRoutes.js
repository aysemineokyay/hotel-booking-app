import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyBottomTabNavigator from "../components/MyBottomTabNavigator";

const HomeRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTintColor: "black",
        headerTitle: "",
      }}
    >
      <Stack.Screen
        name="MyBottomTabNavigator"
        component={MyBottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeRoutes;

const styles = StyleSheet.create({});
