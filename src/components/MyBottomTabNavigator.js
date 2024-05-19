import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "../screens/homeScreens/HomeScreen";
import BookingScreen from "../screens/homeScreens/BookingScreen";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/homeScreens/ProfileScreen";
import { useDispatch } from "react-redux";
import { getRezervations } from "../slices/bookingScreenSlice";
import FavoriteScreen from "../screens/homeScreens/FavoriteScreen";
import { getUsers } from "../slices/homeScreenSlice";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                {focused ? (
                  <Entypo name="home" size={24} color="black" />
                ) : (
                  <AntDesign name="home" size={24} color="black" />
                )}
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
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                {focused ? (
                  <MaterialCommunityIcons
                    name="notebook-multiple"
                    size={24}
                    color="black"
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="notebook-outline"
                    size={24}
                    color="black"
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          title: "Favorites",
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                {focused ? (
                  <AntDesign name="heart" size={24} color="black" />
                ) : (
                  <AntDesign name="hearto" size={24} color="black" />
                )}
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
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                {focused ? (
                  <FontAwesome5 name="user-alt" size={24} color="black" />
                ) : (
                  <FontAwesome5 name="user" size={24} color="black" />
                )}
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
