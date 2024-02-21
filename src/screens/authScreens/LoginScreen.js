import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../services/firebase";

// https://firebase.google.com/docs/auth/web/start?authuser=0#sign_in_existing_users
const LoginScreen = () => {
  const [email, setEmail] = useState("ayse@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(`Giriş başarılı: ${userCredential.user.email}`);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert(`Doğrulama maili gönderildi: ${userCredential.user.email}`);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.header}>Giriş yap</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Giriş yap" onPress={handleLogin} />
        <Button title="Kayıt ol" onPress={handleSignup} />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  header: {
    fontSize: 42,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    fontSize: 24,
  },
});
