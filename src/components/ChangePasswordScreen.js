import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
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
  setPassword,
} from "../slices/loginScreenSlice";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../services/firebase";

const ChangePasswordScreen = (navigation) => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const confirmPassword = useSelector(selectConfirmPassword);
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const height = useHeaderHeight();

  const handleChangePassword = () => {
    if (newPassword === password) {
      Alert.alert("Uyarı", "Yeni şifreniz eski şifreniz ile aynı olamaz");
    } else if (newPassword !== confirmPassword) {
      Alert.alert("Hata", "Şifreler birbiriyle aynı değil!");
    } else if (newPassword === confirmPassword) {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          // Yeni şifreyi kullanarak kullanıcının şifresini güncelle
          updatePassword(user, confirmPassword)
            .then(() => {
              Alert.alert("Başarılı", "Şifre başarılı şekilde güncellendi.");
              setNewPassword("");
              dispatch(setConfirmPassword(null));
            })
            .catch((error) => {
              Alert.alert(
                "Hata",
                "Şifre güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz."
              );
              console.error("Şifre güncelleme hatası:", error);
            });
        })
        .catch((error) => {
          Alert.alert(
            "Hata",
            "Lütfen kullanıcı bilgilerinizi kontrol ediniz ve tekrar giriş yapıp deneyiniz."
          );
          console.error("Yeniden doğrulama hatası:", error);
        });
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
            <Text style={styles.inputLabel}>New Password</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="lock" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => setNewPassword(text)}
                placeholder="Enter new password"
                secureTextEntry={hidePassword}
                autoCapitalize="none"
                value={newPassword}
              />
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                <Icon
                  name={hidePassword ? "eye-slash" : "eye"}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Confirm Password</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="lock" size={24} color="#000" style={styles.icon} />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  dispatch(setConfirmPassword(text));
                }}
                placeholder="Confirm your new password"
                secureTextEntry={hideConfirmPassword}
                autoCapitalize="none"
                value={confirmPassword}
              />
              <TouchableOpacity
                onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
              >
                <Icon
                  name={hideConfirmPassword ? "eye-slash" : "eye"}
                  size={24}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Change Now"
                color="white"
                onPress={handleChangePassword}
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

export default ChangePasswordScreen;
