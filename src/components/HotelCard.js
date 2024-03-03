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
import { AntDesign } from "@expo/vector-icons";

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
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.hotelName} numberOfLines={2} ellipsizeMode="tail">
          {data.name}
        </Text>
        <View style={styles.cityRating}>
          <View style={styles.placeContainer}>
            <EvilIcons
              name="location"
              size={18}
              color="#767676"
              style={styles.icon}
            />
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
    width: (Dimensions.get("window").width / 9) * 4,
    borderRadius: 20,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
    resizeMode: "cover",
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
  rating: {
    fontSize: 15,
    fontWeight: "600",
    color: "gold",
  },
});
