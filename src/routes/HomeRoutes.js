import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyBottomTabNavigator from "../components/MyBottomTabNavigator";
import HotelDetails from "../components/HotelDetails";
import EditProfileScreen from "../components/EditProfileScreen";
import ChangePasswordScreen from "../components/ChangePasswordScreen";
import Map from "../components/Map";

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
      <Stack.Screen
        name="HotelDetails"
        component={HotelDetails}
        options={{
          headerShown: true,
          contentStyle: { backgroundColor: "white" },
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: true, headerTitle: "Edit Profile" }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ headerShown: true, headerTitle: "Change Password" }}
      />
    </Stack.Navigator>
  );
};

export default HomeRoutes;

const styles = StyleSheet.create({});
