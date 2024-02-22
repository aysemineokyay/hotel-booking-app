import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "../screens/homeScreens/HomeScreen";
import BookingScreen from "../screens/homeScreens/BookingScreen";
import FavoriteScreen from "../screens/homeScreens/FavoriteScreen";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileNavigator from "./ProfileNavigator";
import ProfileScreen from "../screens/homeScreens/ProfileScreen";

const MyBottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#000000",
        headerStyle: { height: 110 },
        headerShadowVisible: false,
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown:false,
          title: "Home",
          tabBarIcon: () => {
            return (
              <View>
                <AntDesign name="home" size={30} color="black" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Booking"
        component={BookingScreen}
        options={{
          title: "Booking",
          tabBarIcon: () => {
            return (
              <View>
                <AntDesign name="book" size={30} color="black" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          title: "Favorite",
          tabBarIcon: () => {
            return (
              <View>
                <MaterialIcons name="favorite-border" size={30} color="black" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: () => {
            return (
              <View>
                <FontAwesome6 name="user" size={30} color="black" />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MyBottomTabNavigator;

const styles = StyleSheet.create({});
