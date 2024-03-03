import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectPassword,
  setEmail,
} from "../slices/loginScreenSlice";
import { auth, storage } from "../services/firebase";
import * as ImagePicker from "expo-image-picker";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
  updateProfile,
} from "firebase/auth";

const EditProfileScreen = () => {
  const email = useSelector(selectEmail);
  const [newEmail, setNewEmail] = useState(null);
  const password = useSelector(selectPassword);
  const dispatch = useDispatch();
  const user = auth.currentUser;
  const [userName, setUserName] = useState(null);
  const [image, setImage] = useState(null);
  const handleImagePicker = async () => {
    // Izin almasına gerek yok
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSaveChanges = () => {
    const credential = EmailAuthProvider.credential(user.email, password);

    // Kullanıcının yeniden doğrulanması
    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (user.email !== newEmail) {
          updateEmail(user, newEmail)
            .then(() => {
              sendEmailVerification(user)
                .then(() => {
                  updateProfile(user, {
                    displayName: userName,
                    photoURL: image,
                  })
                    .then(() => {
                      Alert.alert(
                        "Başarılı",
                        "Profil bilgileri başarıyla güncellendi."
                      );
                      setNewEmail(null);
                      setImage(null);
                      setUserName(null);
                    })
                    .catch((error) => {
                      Alert.alert(
                        "Hata",
                        "Profil bilgileriniz güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz."
                      );
                    });
                })
                .catch((error) => {
                  Alert.alert(
                    "Hata",
                    "Bir hata oluştu. Lütfen tekrar deneyiniz."
                  );
                });
            })
            .catch((error) => {
              Alert.alert(
                "Hata",
                "Profil bilgileriniz güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz."
              );
            });
        } else {
          updateProfile(user, {
            displayName: userName,
            photoURL: image,
          })
            .then(() => {
              Alert.alert(
                "Başarılı",
                "Profil bilgileri başarıyla güncellendi."
              );
              setNewEmail(null);
              setImage(null);
              setUserName(null);
            })
            .catch((error) => {
              Alert.alert(
                "Hata",
                "Profil bilgileriniz güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz."
              );
            });
        }
      })
      .catch((error) => {
        Alert.alert(
          "Hata",
          "Lütfen kullanıcı bilgilerinizi kontrol ediniz ve tekrar giriş yapınız."
        );
      });
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 70,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        {image ? (
          <Image
            source={{
              uri: image
                ? image
                : "https://firebasestorage.googleapis.com/v0/b/hotel-booking-app-571f2.appspot.com/o/profileImage.png?alt=media&token=d6ad2f24-2f8e-41af-9a53-a7537e56fbb1",
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        ) : (
          <Image
            source={{
              uri: user.photoURL
                ? user.photoURL
                : "https://firebasestorage.googleapis.com/v0/b/hotel-booking-app-571f2.appspot.com/o/profileImage.png?alt=media&token=d6ad2f24-2f8e-41af-9a53-a7537e56fbb1",
            }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        )}

        <Button title={"Select Image"} onPress={handleImagePicker} />
      </View>

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={35}
            color="black"
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUserName(text)}
            defaultValue={user.displayName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={35} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            onChangeText={(text) => dispatch(setEmail(text))}
            keyboardType="email-address"
            autoCapitalize="none"
            defaultValue={email}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Save Changes"
          color="white"
          onPress={handleSaveChanges}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    padding: 20,
    backgroundColor: "#00000011",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#cccccc",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: "10%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#448178",
    width: "80%",
  },
});

export default EditProfileScreen;
