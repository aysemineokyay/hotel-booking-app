import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthRoutes from "./AuthRoutes";
import HomeRoutes from "./HomeRoutes";

const Router = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {currentUser ? ( */}
        <Stack.Screen
          name="HomeRoutes"
          component={HomeRoutes}
          options={{ headerShown: false }}
        />
        {/* ) : ( */}
        <Stack.Screen
          name="AuthRoutes"
          component={AuthRoutes}
          options={{ headerShown: false }}
        />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
