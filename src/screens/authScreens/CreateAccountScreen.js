import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useHeaderHeight } from "@react-navigation/elements";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConfirmPassword,
  selectEmail,
  selectPassword,
  setConfirmPassword,
  setEmail,
  setPassword,
} from "../../slices/loginScreenSlice";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../services/firebase";

const CreateAccountScreen = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const confirmPassword = useSelector(selectConfirmPassword);
  const dispatch = useDispatch();
  const height = useHeaderHeight();
  const handleSignup = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          sendEmailVerification(userCredential.user)
            .then(() => {
              Alert.alert(
                "Başarılı",
                `Doğrulama maili gönderildi: ${userCredential.user.email}`
              );
            })
            .catch((error) => {
              console.log(error);
              alert(error);
            });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              Alert.alert(
                "Uyarı",
                "Girmiş olduğunuz email adresi kullanılıyor."
              );
              break;
            case "auth/invalid-email":
              Alert.alert("Hata", "Geçersiz email adresi girdiniz.");
              break;
            case "auth/operation-not-allowed":
              Alert.alert("Hata", "Bir hata oluştu.");
              break;
            case "auth/weak-password":
              Alert.alert("Uyarı", "Lütfen daha güçlü bir şifre belirleyiniz.");
              break;
            default:
              console.log(error.message);
              break;
          }
        });
    } else {
      Alert.alert("Hata", "Şifreler birbiriyle aynı değil.");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={height}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="lock" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => dispatch(setEmail(text))}
                inputMode="email"
                autoCapitalize="none"
                placeholder="Enter your email address"
              />
            </View>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="lock" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => dispatch(setPassword(text))}
                placeholder="Create password"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="lock" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => dispatch(setConfirmPassword(text))}
                placeholder="Confirm your password"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Create Account"
                color="white"
                onPress={handleSignup}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
  },
  inputContainer: {
    padding: 20,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderColor: "#00000033",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  inputLabel: {
    fontWeight: "600",
    marginTop: 15,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  icon: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: "50%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#448178",
    borderTopWidth: 0,
  },
});

export default CreateAccountScreen;
