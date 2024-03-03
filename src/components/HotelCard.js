import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HotelCard = ({ data }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    // @ts-ignore
    navigation.navigate("HotelDetails", { data: data });
  };
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <View>
        <Image style={styles.image} source={{ uri: data.image }} />
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.hotelName} numberOfLines={2} ellipsizeMode="tail">
          {data.name}
        </Text>
        <View style={styles.placeContainer}>
          <EvilIcons
            name="location"
            size={18}
            color="#767676"
            style={styles.icon}
          />
          <Text style={styles.place}>{data.city}</Text>
        </View>
        <Text style={styles.newPrice}>${data.rating}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
    width: (Dimensions.get("window").width / 9) * 4,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 15,
    resizeMode: "cover",
  },
  textContainer: {
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft: 10,
  },

  placeContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 5,
  },
  hotelName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },

  icon: {},

  place: {
    fontSize: 12,
    marginBottom: 2,
    color: "#767676",
  },
  newPrice: {
    fontSize: 15,
    fontWeight: "600",
  },
});
