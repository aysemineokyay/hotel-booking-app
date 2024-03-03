import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity } from "react-native";
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
import { getHotels, selectData, selectHotels } from "../../slices/homeScreenSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { addRezervation } from "../../slices/bookingScreenSlice";
import { auth } from "../../services/firebase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const BookingNewScreen = ({ hotelData, route }) => {
  const rezervations = useSelector(selectRezervations);
  const hotelsData = useSelector(selectHotelsData);
  const dataa = useSelector(selectData);
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

  console.log("data:", dataa[0].roomTypes);

  console.log("hotel data:", route.params.hotelData);

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
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const getTotalDays = (startDate, endDate) => {
    var diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={20} color="black" />
      </TouchableOpacity>
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
        <View style={{ justifyContent: "center", marginTop: "1%" }}>
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
          {dataa[0].roomTypes.map((rt) => (
            <Pressable style={styles.roomTypeButton} onPress={() => setRoomType(rt)}>
              <Text style={styles.buttonText}>{rt.name}</Text>
            </Pressable>
          ))}
        </View>

        <View
          style={{
            height: "25%",
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
            <Text>{roomType.name ? roomType.name : "Please select a room type"}</Text>
          </View>
        </View>
        <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: "3%" }}>
          Price: {getTotalDays(endDate, startDate) * roomType.price_per_night} TL
        </Text>
        <Pressable
          style={styles.button}
          onPress={() =>
            addRezervation({
              adultCount: Number(adultCount),
              checkInDate: formatDate(startDate),
              checkOutDate: formatDate(endDate),
              childCount: Number(childCount),
              guestCount: Number(adultCount) + Number(childCount),
              hotelId: "hotels/" + route.params.hotelData.id,
              roomCount: roomCount,
              roomType: "roomTypes/" + roomType.id,
              totalPrice: getTotalDays(endDate, startDate) * roomType.price_per_night,
              userId: auth.currentUser.uid,
            })
          }
        >
          <Text style={styles.buttonText}>CONFIRM</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default BookingNewScreen;

const styles = StyleSheet.create({
  mainView: {
    padding: "5%",
  },
  container: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 2,
    fontSize: 16,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 2,
  },
  label: {
    fontWeight: "bold",
    margin: 5,
    marginHorizontal: 16,
    justifyContent: "flex-start",
    fontSize: 16,
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
    marginTop: "5%",
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
  backButton: {
    position: "absolute",
    top: 50,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 7,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});