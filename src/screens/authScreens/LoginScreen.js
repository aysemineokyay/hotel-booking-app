import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import {
  sendPasswordResetEmail,
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
        Alert.alert("Başarılı", `Hoşgeldin ${userCredential.user.email}`);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            Alert.alert("Hata", "Geçersiz email adresi girdiniz.");
            break;
          case "auth/invalid-credential":
            Alert.alert("Hata", "Geçersiz email veya şifre girdiniz.");
            break;
          case "auth/too-many-requests":
            Alert.alert("Hata", "Çok sayıda hatalı giriş yapıldı.");
            break;
          case "auth/operation-not-allowed":
            Alert.alert("Hata", "Bir hata oluştu.");
            break;
          default:
            console.log(error.message);
            break;
        }
      });
  };
  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Başarılı", `Parola sıfırlama maili gönderildi: ${email}`);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Hata", error.message);
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
        <View style={styles.emailTextInput}>
          <Feather name="mail" size={24} color="grey" />
          <TextInput
            placeholder="Enter your email address"
            onChangeText={(text) => {
              dispatch(setEmail(text));
            }}
            inputMode="email"
            autoCapitalize="none"
            value={email}
          />
        </View>
      </View>

      <View style={styles.passwordContainer}>
        <Text style={styles.passwordText}>Password</Text>
        <View style={styles.passwordInput}>
          <View style={styles.passwordInputLeftSide}>
            <Feather name="lock" size={24} color="grey" />
            <TextInput
              placeholder="Create your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              onChangeText={(text) => {
                dispatch(setPassword(text));
              }}
              value={password}
            />
          </View>
          <View style={styles.passwordInputRightSide}>
            <TouchableOpacity onPress={togglePasswordVisibility}>
              {showPassword ? (
                <FontAwesome5 name="eye" size={24} color="grey" />
              ) : (
                <FontAwesome5 name="eye-slash" size={24} color="grey" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={toggleModalVisibility}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.signInContainer} onPress={handleLogin}>
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
              <View style={styles.topContainer}>
                <View style={styles.topContainerLeftSide}>
                  <Text style={styles.modalTextHeader}>Forgot Password</Text>
                  <Text style={styles.modalText}>Enter your email address</Text>
                </View>
                <View style={styles.topContainerRightSide}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleModalVisibility();
                    }}
                  >
                    <AntDesign name="close" size={24} color="grey" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.passwordResetContainer}>
                <Text style={styles.passwordResetText}>Email Address</Text>
                <View style={styles.passwordResetTextInput}>
                  <Feather name="mail" size={24} color="#448178" />
                  <TextInput
                    placeholder="Enter your email address"
                    onChangeText={(text) => {
                      dispatch(setEmail(text));
                    }}
                    autoCapitalize="none"
                    inputMode="email"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleForgotPassword}
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
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
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
    paddingTop: 20,
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
  passwordInput: {
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
  passwordInputLeftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  passwordInputRightSide: {
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
    color: "#448178",
    fontWeight: "600",
  },

  signInContainer: {
    backgroundColor: "#448178",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#06b3c4",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 200,
    marginHorizontal: 5,
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

  topContainer: {
    flexDirection: "row",

    justifyContent: "space-between",
    gap: 180,
  },
  topContainerLeftSide: {
    paddingTop: 20,
  },
  topContainerRightSide: { paddingHorizontal: 5 },

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
    backgroundColor: "#448178",
    borderWidth: 1,
    borderColor: "#448178",
    borderRadius: 10,
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
