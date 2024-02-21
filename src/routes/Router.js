import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AuthRoutes from "./AuthRoutes";
import HomeRoutes from "./HomeRoutes";
import EditProfileScreen from "../components/EditProfileScreen";
import ChangePasswordScreen from "../components/ChangePasswordScreen";
import NotificationScreen from "../components/NotificationScreen";
import SecurityScreen from "../components/SecurityScreen";

import LegalAndPoliciesScreen from "../components/LegalAndPoliciesScreen";
import HelpSupport from "../components/HelpSupport";

const Router = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
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
        <Stack.Screen 
        name="Edit Profile" 
        component={EditProfileScreen} 
        />  
        <Stack.Screen 
        name="Change Password" 
        component={ChangePasswordScreen} 
        />  
        <Stack.Screen 
        name="Notifications" 
        component={NotificationScreen} 
        /> 
        <Stack.Screen 
        name="Security" 
        component={SecurityScreen} 
        />
        {/* <Stack.Screen 
        name="Language" 
        component={LanguageScreen} 
        />  */}
        <Stack.Screen 
        name="Legal And Policies" 
        component={LegalAndPoliciesScreen} 
        />
        <Stack.Screen 
        name="Help & Support" 
        component={HelpSupport} 
        /> 


        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
