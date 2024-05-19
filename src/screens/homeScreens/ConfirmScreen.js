import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ConfirmScreen = ({ navigation, route }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#448178",
      }}
    >
      <MaterialCommunityIcons name="check-decagram" size={150} color="black" />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Booking confirmed
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{ marginTop: 15 }}
      >
        <Text
          style={{
            fontSize: 18,
            textDecorationLine: "none",
            color: "tomato",
          }}
        >
          Go to Home Screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmScreen;

const styles = StyleSheet.create({});
