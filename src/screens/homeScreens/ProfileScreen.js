import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // expo kullanıyorsanız
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { auth } from "../../services/firebase";

const ProfileScreen = ({ navigation }) => {
  const handleLogout = () => {
    auth.signOut();
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("EditProfileScreen")}
      >
        <Ionicons name="person-outline" size={30} color="black" />
        <Text style={styles.text}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("ChangePasswordScreen")}
      >
        <Ionicons name="lock-closed-outline" size={30} color="black" />
        <Text style={styles.text}>Change Password</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Ionicons name="notifications-outline" size={30} color="black" />
        <Text style={styles.text}>Notifications</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Security")}
      >
        <MaterialCommunityIcons
          name="shield-key-outline"
          size={30}
          color="black"
        />
        <Text style={styles.text}>Security</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>

      {/* <TouchableOpacity 
      style={styles.item}
      onPress={() => navigation.navigate('Language')}>
      <AntDesign name="earth" size={30} color="black" />
        <Text style={styles.text}>Language</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity> */}

      {/* <Text></Text>
      <Text style={styles.header}>Preferences</Text>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Legal And Policies")}
      >
        <Feather name="shield" size={30} color="black" />
        <Text style={styles.text}>Legal and Policies</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate("Help & Support")}
      >
        <Feather name="help-circle" size={30} color="black" />
        <Text style={styles.text}>Help & Support</Text>
        <Ionicons name="chevron-forward-outline" size={30} color="black" />
      </TouchableOpacity>
      */}
      <TouchableOpacity style={styles.item} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={30} color="#ff0000" />
        <Text style={{ color: "red" }}> Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    padding: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 5,
    borderBottomColor: "#ffffff",
    marginBottom: 3,
    borderRadius: 10,
  },
  text: {
    flex: 1,
    marginLeft: 10,
  },
});

export default ProfileScreen;
