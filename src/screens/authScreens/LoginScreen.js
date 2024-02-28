import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectPassword,
  setEmail,
  setPassword,
} from "../../slices/loginScreenSlice";

const LoginScreen = () => {
  // const [email, setEmail] = useState("ayse@gmail.com");
  // const [password, setPassword] = useState("123456");
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(`Giriş başarılı: ${userCredential.user.email}`);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Geçersiz email adresi girdiniz.");
            break;
          case "auth/invalid-credential":
            alert("Geçersiz email veya şifre girdiniz.");
            break;
          case "auth/operation-not-allowed":
            alert("Bir hata oluştu.");
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Login Account</Text>
        <Text style={styles.text}>Please login with registered account</Text>
      </View>

      <View style={styles.emailContainer}>
        <Text style={styles.emailText}>Email Address</Text>
        <TouchableOpacity style={styles.emailTextInput}>
          <Feather name="mail" size={24} color="grey" />
          <TextInput
            placeholder="Enter your email address"
            onChangeText={(text) => {
              dispatch(setEmail(text));
            }}
            inputMode="email"
            autoCapitalize="none"
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
              autoCapitalize="none"
              onChangeText={(text) => {
                dispatch(setPassword(text));
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
        <TouchableOpacity onPress={toggleModalVisibility}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signInContainer}>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signInContainerText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modalContainer}>
        <BottomModal
          swipeThreshold={200}
          swipeDirection={["up", "down"]}
          visible={isModalVisible}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
        >
          <ModalContent>
            <View style={styles.modalContentContainer}>
              <Text style={styles.modalTextHeader}>Forgot Password</Text>
              <Text style={styles.modalText}>Enter your email address</Text>

              <View style={styles.passwordResetContainer}>
                <Text style={styles.passwordResetText}>Email Address</Text>
                <TouchableOpacity style={styles.passwordResetTextInput}>
                  <Feather name="mail" size={24} color="#06b3c4" />
                  <TextInput
                    placeholder="Enter your email address"
                    onChangeText={(text) => {
                      dispatch(setEmail(text));
                    }}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  toggleModalVisibility();
                }}
              >
                <Text style={styles.closeModalText}>Send Code</Text>
              </TouchableOpacity>
            </View>
          </ModalContent>
        </BottomModal>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
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
  emailTextInput: {
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
    marginBottom: 200,
    marginHorizontal: 20,
    height: 60,
  },
  signInContainerText: {
    color: "white",
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,

    backgroundColor: "white",
    alignItems: "center",
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "auto",
    height: "50%",
    justifyContent: "flex-end",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  modalContentContainer: {
    paddingTop: 20,
    paddingLeft: 10,
    alignItems: "flex-start",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  modalTextHeader: {
    fontSize: 18,
    fontWeight: "600",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#9F94A2",
    paddingTop: 5,
  },

  passwordResetContainer: {
    paddingTop: 10,
  },
  passwordResetText: {
    fontSize: 16,
    fontWeight: "600",
  },
  passwordResetTextInput: {
    marginTop: 10,
    marginBottom: 40,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderColor: "#f9f9f9",
    height: 60,
    width: 350,
  },

  modalButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: "#06b3c4",
    borderWidth: 1,
    borderColor: "#06b3c4",
    borderRadius: 30,
    width: 350,
    height: 50,
    marginBottom: 40,
  },
  closeModalText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
