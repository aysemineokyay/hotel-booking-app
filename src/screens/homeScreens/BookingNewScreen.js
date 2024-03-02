import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
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
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingNewScreen = ({ hotelData }) => {
  const rezervations = useSelector(selectRezervations);
  const hotelsData = useSelector(selectHotelsData);
  const hotels = useSelector(selectHotels);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [roomType, setRoomType] = useState("Single");
  useEffect(() => {
    dispatch(getRezervations());
    rezervations.forEach((item) => {
      console.log("item", item.hotelId);
      dispatch(getHotelDataOfRezervations(item.hotelId));
    });
  }, [rezervations]);
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setEndDate(currentDate);
  };

  return (
    <View style={styles.mainView}>
      <View>
        <View style={styles.datepicker}>
          <View style={styles.datepicker_view}>
            <Text style={styles.label}>Check In Date</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode={"date"}
              is24Hour={true}
              display={"spinner"}
              onChange={onStartDateChange}
            />
          </View>
          <View style={styles.datepicker_view}>
            <Text style={styles.label}>Check Out Date</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              mode={"date"}
              is24Hour={true}
              display={"spinner"}
              onChange={onEndDateChange}
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "center", marginTop: "5%", padding: "5%" }}>
        <Text style={styles.label}>Adult Count</Text>
        <TextInput style={styles.container} placeholder="4 person " onChangeText={(e) => setAdultCount(e)} />
        <Text style={styles.label}>Child Count</Text>
        <TextInput style={styles.container} placeholder="4 person " onChangeText={(e) => setChildCount(e)} />
        <Text style={styles.label}>Room Count</Text>
        <TextInput style={styles.container} placeholder="1 room" onChangeText={(e) => setRoomCount(e)} />
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Pressable style={styles.roomTypeButton} onPress={() => setRoomType("Single")}>
          <Text style={styles.buttonText}>SINGLE</Text>
        </Pressable>
        <Pressable style={styles.roomTypeButton} onPress={() => setRoomType("Double")}>
          <Text style={styles.buttonText}>DOUBLE</Text>
        </Pressable>
        <Pressable style={styles.roomTypeButton} onPress={() => setRoomType("Suite")}>
          <Text style={styles.buttonText}>SUITE</Text>
        </Pressable>
      </View>

      <View
        style={{
          height: "30%",
          borderColor: "#D9D9D9",
          borderRadius: 15,
          borderWidth: 1,
        }}
      >
        <View style={{ padding: "2%", flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Check In Date: </Text>
          <Text>{startDate.toLocaleString()}</Text>
        </View>
        <View style={{ padding: "2%", flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Check Out Date: </Text>
          <Text>{endDate.toLocaleString()}</Text>
        </View>
        <View style={{ padding: "2%", flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Adult Count: </Text>
          <Text>{adultCount}</Text>
        </View>
        <View style={{ padding: "2%", flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Child Count: </Text>
          <Text>{childCount}</Text>
        </View>
        <View style={{ padding: "2%", flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Room Count: </Text>
          <Text>{roomCount}</Text>
        </View>
        <View style={{ padding: "2%", flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Room Type: </Text>
          <Text>{roomType}</Text>
        </View>
      </View>
      <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: "5%" }}>
        Price: {adultCount * 1200 + childCount * 1200} TL
      </Text>
      <Pressable style={styles.button} onPress={() => console.log("confirmed")}>
        <Text style={styles.buttonText}>CONFIRM</Text>
      </Pressable>
    </View>
  );
};

export default BookingNewScreen;

const styles = StyleSheet.create({
  mainView: {
    padding: "5%",
  },
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    fontSize: 20,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    margin: 10,
    marginHorizontal: 16,
    justifyContent: "flex-start",
    fontSize: 20,
  },
  datepicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  datepicker_view: {
    width: "50%",
    borderColor: "#D9D9D9",
    borderRadius: 15,
    borderWidth: 1,
  },
  button: {
    borderColor: "#0D9276",
    borderWidth: 2,
    color: "0D9276",
    borderRadius: 30,
    backgroundColor: "#0D9276",
    width: "30%",
    height: "5%",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: "10%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  roomTypeButton: {
    borderColor: "#0D9276",
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#0D9276",
    width: "20%",
    height: "20%",
    justifyContent: "center",
    alignSelf: "center",
    marginLeft: "10%",
  },
});
