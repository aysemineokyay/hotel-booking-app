import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../services/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, deleteFavorite } from "../slices/homeScreenSlice";

const HotelCard = ({ data, index, user }) => {
  const navigation = useNavigation();
  const [press, setPress] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // user içerisindeki favori otellerin kontrolü
    const isFavorited = user.some(
      (item) => item.description === data.description
    );
    setIsFavorite(isFavorited);
  }, []);
  // const x = user.map((item) => {
  //   if (item.description === data.description) return true;
  //   else return false;
  // });
  const handlePress = () => {
    // @ts-ignore
    navigation.navigate("HotelDetails", { data: data });
  };
  const handleAddFavorites = () => {
    setIsFavorite(!isFavorite);
    const uid = auth.currentUser.uid;
    if (!isFavorite === true) {
      //addFavorites({ status: 1, data: data, index: index });
      dispatch(addFavorite({ status: 1, data: data, index: index }));
    } else if (!isFavorite === false) {
      //deleteFavorites({ status: 1, data: data, index: index });
      dispatch(deleteFavorite({ status: 1, data: data, index: index }));
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <ImageBackground
        resizeMode="cover"
        borderRadius={15}
        source={{ uri: data.image }}
        style={styles.image}
      >
        <TouchableOpacity onPress={handleAddFavorites}>
          <AntDesign
            name={isFavorite ? "heart" : "hearto"}
            size={20}
            color="white"
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      </ImageBackground>
      {/* <Image style={styles.image} source={{ uri: data.image }} /> */}
      <View style={styles.textContainer}>
        <Text style={styles.hotelName} numberOfLines={2} ellipsizeMode="tail">
          {data.name}
        </Text>
        <View style={styles.cityRating}>
          <View style={styles.placeContainer}>
            <EvilIcons name="location" size={18} color="#767676" />
            <Text style={styles.place}>{data.city}</Text>
          </View>
          <View>
            <Text style={styles.rating}>
              <AntDesign name="star" size={16} color="gold" />
              {data.rating}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: "#00000022",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
  },
  cityRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10,
    flex: 1,
    width: 120,
  },

  placeContainer: {
    flexDirection: "row",
  },
  heartIcon: { position: "absolute", top: 5, right: 5 },
  hotelName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
    flexWrap: "wrap",
  },

  place: {
    fontSize: 12,
    marginBottom: 2,
    color: "#767676",
  },
  rating: {
    fontSize: 15,
    fontWeight: "600",
    color: "gold",
  },
});
