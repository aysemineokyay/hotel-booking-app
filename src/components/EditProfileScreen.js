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
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
      setImage(result.assets[0].uri); // file:///
      // uploadToFirebase(result.assets[0].uri);
    }
  };
  // const uploadToFirebase = async (uri) => {
  //   const localImageRes = await fetch(uri);
  //   const blob = await localImageRes.blob();
  //   const imageId = uuid();
  //   const refString = `flowers/${imageId}.jpg`;
  //   const imageRef = ref(storage, refString);
  //   const result = await uploadBytes(imageRef, blob);
  //   getDownloadURL(result.ref).then((url) => {
  //     setUrls((prev) => [...prev, url]);
  //   });
  // };

  const handleSaveChanges = () => {
    const credential = EmailAuthProvider.credential(user.email, password);
    console.log("credential", credential);

    // Kullanıcının yeniden doğrulanması
    reauthenticateWithCredential(user, credential)
      .then(() => {
        if (user.email !== newEmail) {
          updateEmail(user, newEmail)
            .then(() => {
              sendEmailVerification(user)
                .then(() => {
                  console.log("Doğrulama e-postası gönderildi.");

                  updateProfile(user, {
                    displayName: userName,
                    photoURL: image,
                  })
                    .then(() => {
                      console.log("Profil bilgileri güncellendi.");
                      Alert.alert(
                        "Başarılı",
                        "Profil bilgileri başarıyla güncellendi."
                      );
                      setNewEmail(null);
                      setImage(null);
                      setUserName(null);
                    })
                    .catch((error) => {
                      console.error("Profil güncelleme hatası:", error);
                      Alert.alert(
                        "Hata",
                        "Profil bilgileriniz güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz."
                      );
                    });
                })
                .catch((error) => {
                  console.error("Doğrulama e-postası gönderme hatası:", error);
                  Alert.alert(
                    "Hata",
                    "Bir hata oluştu. Lütfen tekrar deneyiniz."
                  );
                });
            })
            .catch((error) => {
              console.error("E-posta güncelleme hatası:", error);
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
              console.log("Profil bilgileri güncellendi.");
              Alert.alert(
                "Başarılı",
                "Profil bilgileri başarıyla güncellendi."
              );
              setNewEmail(null);
              setImage(null);
              setUserName(null);
            })
            .catch((error) => {
              console.error("Profil güncelleme hatası:", error);
              Alert.alert(
                "Hata",
                "Profil bilgileriniz güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz."
              );
            });
        }
      })
      .catch((error) => {
        console.error("Yeniden doğrulama hatası:", error);
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
            color="blue"
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUserName(text)}
            defaultValue={user.displayName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={35} color="blue" />
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

      <TouchableOpacity
        onPress={handleSaveChanges}
        style={{
          backgroundColor: "blue",
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 15,
        }}
      >
        <Text style={{ color: "white" }}>Save Changes</Text>
      </TouchableOpacity>
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
});

export default EditProfileScreen;
