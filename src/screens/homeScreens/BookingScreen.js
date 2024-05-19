import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRezervations,
  getRezervationsData,
  selectNewData,
  selectRezervations,
  selectStatus,
} from "../../slices/bookingScreenSlice";

import BookingCard from "../../components/BookingCard";

const BookingScreen = () => {
  const newData = useSelector(selectNewData);
  const rezervations = useSelector(selectRezervations);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRezervations());
  }, [rezervations.length]);

  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }
  // if (status === "idle" && newData.length === 0) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text style={styles.text}>Rezervasyon bulunmamaktadır.</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={newData}
        renderItem={({ item }) => <BookingCard dataBooking={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Rezervasyon bulunmamaktadır.</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontSize: 20 },
});
