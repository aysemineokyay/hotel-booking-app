import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../services/firebase.js";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectImageUrl, setImageUrl } from "../../slices/welcomeScreenSlice";

const WelcomeScreen = ({ navigation }) => {
  const imageUrl = useSelector(selectImageUrl);
  const dispatch = useDispatch();
  const imagesRef = ref(storage, "Login1.png");
  useEffect(() => {
    getDownloadURL(imagesRef).then((url) => {
      dispatch(setImageUrl(url));
    });
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: "100%", height: "50%", position: "absolute" }}
      />
      <View style={styles.bottom}>
        <Text style={styles.titleText}>Booking Hotels Anywhere Is Easier</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("CreateAccountScreen");
            }}
          >
            <Text style={styles.text}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            <Text style={{ color: "#448178", fontWeight: 600 }}>
              Already Have an Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottom: {
    position: "absolute",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
    bottom: 0,
    height: "55%",
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "white",
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: "#448178",
    width: "100%",
    alignItems: "center",
  },

  titleText: {
    color: "black",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});
