import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectNewData } from "../../slices/bookingScreenSlice";
import { selectStatus } from "../../slices/bookingScreenSlice";

import BookingCard from "../../components/BookingCard";

const BookingScreen = () => {
  const newData = useSelector(selectNewData);
  const status = useSelector(selectStatus);

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
