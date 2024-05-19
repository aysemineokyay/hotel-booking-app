import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const FavoritesCard = ({ dataFavorites }) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: dataFavorites.data.image }} style={styles.image} />

      {/* <Image style={styles.image} source={{ uri: data.image }} /> */}
      <View style={styles.textContainer}>
        <Text style={styles.hotelName} numberOfLines={2} ellipsizeMode="tail">
          {dataFavorites.data.name}
        </Text>
        <View style={styles.cityRating}>
          <View style={styles.placeContainer}>
            <EvilIcons name="location" size={18} color="#767676" />
            <Text style={styles.place}>{dataFavorites.data.city}</Text>
          </View>
          <View>
            <Text style={styles.rating}>
              <AntDesign name="star" size={16} color="gold" />
              {dataFavorites.data.rating}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FavoritesCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderColor: "#00000022",
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width / 2.7,
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "cover",
    borderRadius: 15,
  },
  cityRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textContainer: {
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 10,
    flex: 1,
  },

  placeContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 5,
  },
  heartIcon: { position: "absolute", top: 5, right: 5 },
  hotelName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
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
