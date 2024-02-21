import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HotelCard = (props) => {

  const navigation =useNavigation();
  const handlePress = () => {
    navigation.navigate('Detail');
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View>
          <Image style={styles.image} source={{ uri: props.placeImage }} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.hotelName}>{props.hotelName}</Text>
          <View style={styles.placeContainer}>
            <EvilIcons
              name="location"
              size={18}
              color="#767676"
              style={styles.icon}
            />
            <Text style={styles.place}>{props.place}</Text>
          </View>
          <Text style={styles.newPrice}>${props.newPrice}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HotelCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 15,
  },
  textContainer: {
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft:10,
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

  icon: {
    margin: 0,
    paddingLeft: 0,
  },

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
