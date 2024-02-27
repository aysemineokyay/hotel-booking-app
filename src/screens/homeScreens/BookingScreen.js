import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHotelDataOfRezervations,
  getRezervations,
  selectHotelsData,
  selectRezervations,
} from "../../slices/bookingScreenSlice";
import { selectStatus } from "../../slices/bookingScreenSlice";
import { selectError } from "../../slices/bookingScreenSlice";
import { getHotels, selectHotels } from "../../slices/homeScreenSlice";

const BookingScreen = () => {
  const rezervations = useSelector(selectRezervations);
  const hotelsData = useSelector(selectHotelsData);
  const hotels = useSelector(selectHotels);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    dispatch(getRezervations());
    rezervations.forEach((item) => {
      console.log("item", item.hotelId);
      dispatch(getHotelDataOfRezervations(item.hotelId));
    });
  }, []);
  console.log(
    "rezervations",
    rezervations.map((item) => {
      return item;
    })
  );
  return (
    <View>
      <Text>BookingScreen</Text>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
