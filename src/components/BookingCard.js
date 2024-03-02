import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const BookingCard = ({ dataBooking }) => {
  return (
    <View style={styles.card}>
      <View style={styles.part_up}>
        <View style={styles.part_one}>
          <Image
            source={{
              uri: dataBooking.hotelData.image,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.part_two}>
          <Text style={styles.title}>{dataBooking.hotelData.name}</Text>
          <Text style={styles.text}>
            {dataBooking.hotelData.city} / {dataBooking.hotelData.country}
          </Text>
          <View style={styles.rating}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#448178", fontWeight: "bold" }}>
                ₺{dataBooking.roomType.price_per_night}{" "}
              </Text>
              <Text style={styles.text}>/ Night</Text>
            </View>
            <Text style={{ color: "gold", fontWeight: "bold" }}>
              <AntDesign name="star" size={16} color="gold" />
              {dataBooking.hotelData.rating}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.part_down}>
        <View style={{ flexDirection: "column", gap: 5 }}>
          <Text style={styles.text}>Check In</Text>
          <Text style={styles.date}>{dataBooking.rezervation.checkInDate}</Text>
        </View>
        <View>
          <AntDesign name="arrowright" size={24} color="black" />
        </View>
        <View style={{ flexDirection: "column", gap: 5 }}>
          <Text style={styles.text}>Check Out</Text>
          <Text style={styles.date}>
            {dataBooking.rezervation.checkOutDate}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    marginBottom: 20,
    borderColor: "#F5F5F5",
    borderWidth: 2,
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    padding: 10,
    gap: 10,
  },
  title: { fontWeight: "700", fontSize: 18 },
  part_up: { flexDirection: "row" },
  part_down: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  text: { color: "#00000088" },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 25,
  },
  date: { fontWeight: "600", fontSize: 16 },
  part_one: { width: "40%" },
  part_two: { width: "60%", justifyContent: "space-evenly" },
  rating: { flexDirection: "row", justifyContent: "space-between" },
});
