import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRezervations,
  selectRezervations,
} from "../../slices/bookingScreenSlice";
import { selectStatus } from "../../slices/bookingScreenSlice";
import { selectError } from "../../slices/bookingScreenSlice";

const BookingScreen = () => {
  const rezervations = useSelector(selectRezervations);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getRezervations());
  }, []);
  console.log("rezervations", rezervations);
  return (
    <View>
      <Text>BookingScreen</Text>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
