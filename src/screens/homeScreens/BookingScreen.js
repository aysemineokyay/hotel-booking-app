import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHotelDataOfRezervations,
  getRezervations,
  selectHotelsData,
  selectRezervations,
  selectData,
  selectNewData,
} from "../../slices/bookingScreenSlice";
import { selectStatus } from "../../slices/bookingScreenSlice";
import { selectError } from "../../slices/bookingScreenSlice";
import { getHotels, selectHotels } from "../../slices/homeScreenSlice";
import BookingCard from "../../components/BookingCard";

const BookingScreen = () => {
  // const rezervations = useSelector(selectRezervations);
  // const hotelsData = useSelector(selectHotelsData);
  const data = useSelector(selectData);
  const newData = useSelector(selectNewData);
  const hotels = useSelector(selectHotels);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRezervations());
    // rezervations.forEach((item) => {
    //   console.log("item", item.hotelId);
    //   dispatch(getHotelDataOfRezervations(item.hotelId));
    // });
  }, []);
  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }
  if (status === "idle" && newData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Rezervasyon bulunmamaktadır.</Text>
      </View>
    );
  }
  console.log("fggfgfgffffff", newData);
  console.log("tttt", newData[0].rezervation);
  console.log("qqqq", data[0].hotelsData);
  return (
    <View style={styles.container}>
      <FlatList
        data={newData}
        renderItem={({ item }) => <BookingCard dataBooking={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
      />
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
