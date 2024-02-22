import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const LoginAccountScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headercontainer}>
          <Text style={styles.headerText}>Login Account</Text>
          <Text style={styles.text}>Please login with registered account</Text>
        </View>

        <View style={styles.emailContainer}>
          <Text style={styles.emailText}>Email Address</Text>
          <TouchableOpacity style={styles.emailButton}>
            <Feather name="mail" size={24} color="grey" />
            <TextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <Text style={styles.passwordText}>Password</Text>
          <TouchableOpacity style={styles.passwordButton}>
            <View style={styles.passwordButtonLeftSide}>
              <Feather name="lock" size={24} color="grey" />
              <TextInput
                placeholder="Create your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
            <View style={styles.passwordButtonRightSide}>
              <TouchableOpacity onPress={togglePasswordVisibility}>
                {showPassword ? (
                  <FontAwesome5 name="eye-slash" size={24} color="grey" />
                ) : (
                  <FontAwesome5 name="eye" size={24} color="grey" />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signInContainer}>
          <TouchableOpacity>
            <Text style={styles.signInContainerText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Modal
         animationType="slide"
         transparent={true}
         visible={isModalVisible}
         onRequestClose={() => {
           setIsModalVisible(!isModalVisible);
         }}
         
         
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Forgot Password</Text>
            <Text style={styles.modalText}>Enter your email address</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={toggleModalVisibility}
            >
              <Text style={styles.closeModalText}>Send Code</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default LoginAccountScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  headercontainer: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    paddingBottom: 10,
  },
  text: {
    fontSize: 14,
    color: "#9F94A2",
  },
  emailContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "600",
  },
  emailButton: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderWidth: 1,
    backgroundColor: "#FBFBFD",
    borderRadius: 20,
    borderColor: "#fbfbfd",
    height: 60,
  },
  passwordContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  passwordText: {
    fontSize: 16,
    fontWeight: "600",
  },
  passwordButton: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    backgroundColor: "#FBFBFD",
    borderRadius: 20,
    borderColor: "#fbfbfd",
    height: 60,
  },
  passwordButtonLeftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  passwordButtonRightSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  forgotPasswordContainer: {
    marginTop: 15,
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  forgotPasswordText: {
    color: "#06b3c4",
    fontWeight: "600",
  },

  signInContainer: {
    backgroundColor: "#06b3c4",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#06b3c4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: "auto",
    marginHorizontal: 20,
    height: 60,
  },
  signInContainerText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width:"auto",
    height:600,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: "#06b3c4",
    borderWidth: 1,
    borderColor: "#06b3c4",
    borderRadius:30,
    width:350,
    height:50,
  },
  closeModalText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize:16,
  },
});
