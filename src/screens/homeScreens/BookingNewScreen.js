import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRezervations,
  getHotelDataOfRezervations,
  setNewData,
  setRezervations,
} from "../../slices/bookingScreenSlice";
import { selectStatus } from "../../slices/bookingScreenSlice";
import { selectError } from "../../slices/bookingScreenSlice";
import {
  getHotels,
  selectData,
  selectHotels,
} from "../../slices/homeScreenSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addRezervation } from "../../slices/bookingScreenSlice";
import { auth, db } from "../../services/firebase";
import { doc } from "firebase/firestore";
import { FontAwesome5 } from "@expo/vector-icons";

const BookingNewScreen = ({ navigation, route }) => {
  const dataa = useSelector(selectData);
  const hotels = useSelector(selectHotels);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [roomType, setRoomType] = useState({});

  const hotelData = route.params.hotelData;
  useEffect(() => {
    dispatch(getHotelDataOfRezervations(hotelData.id));
  }, [hotelData]);
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
    if (startDate <= endDate) {
      return 0;
    } else {
      var diffTime = Math.abs(endDate - startDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  };
  const selectRoomType = (rt) => {
    setRoomType(rt);
  };
  const totalPrice =
    getTotalDays(endDate, startDate) *
    roomType.price_per_night *
    (adultCount + childCount) *
    roomCount;
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                display={"default"}
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
                display={"default"}
                onChange={onEndDateChange}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Adults</Text>
          <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Pressable
              onPress={() => setAdultCount(Math.max(0, adultCount - 1))}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  paddingHorizontal: 6,
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "500",
                  paddingHorizontal: 6,
                }}
              >
                {adultCount}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setAdultCount((c) => c + 1)}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  paddingHorizontal: 6,
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Child</Text>
          <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Pressable
              onPress={() => setChildCount(Math.max(0, childCount - 1))}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  paddingHorizontal: 6,
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "500",
                  paddingHorizontal: 6,
                }}
              >
                {childCount}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setChildCount((c) => c + 1)}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  paddingHorizontal: 6,
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Room</Text>
          <Pressable
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Pressable
              onPress={() => setRoomCount(Math.max(0, roomCount - 1))}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  paddingHorizontal: 6,
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "500",
                  paddingHorizontal: 6,
                }}
              >
                {roomCount}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setRoomCount((c) => c + 1)}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600",
                  paddingHorizontal: 6,
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          {dataa[0].roomTypes.map((rt, i) => (
            <TouchableOpacity
              key={i.toString()}
              style={styles.roomTypeButton}
              onPress={() => selectRoomType(rt)}
            >
              {roomType === rt && (
                <View
                  style={{
                    position: "absolute",
                    alignItems: "flex-end",
                    top: 2,
                    right: 2,
                  }}
                >
                  <FontAwesome5 name="check-circle" size={15} color="black" />
                </View>
              )}

              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                }}
              >
                <Text style={styles.buttonText}>{rt.name}</Text>
                <Text style={styles.buttonText}>
                  ₺{rt.price_per_night} /Night
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            height: 140,
            borderColor: "#00000044",
            borderRadius: 15,
            borderWidth: 1,
            padding: 10,
            marginVertical: 20,
            backgroundColor: "#00000011",
            justifyContent: "center",
          }}
        >
          <View style={{ padding: 5, flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Check In Date: </Text>
            <Text>
              {startDate
                ? startDate.toLocaleDateString()
                : "Please select checkin date"}
            </Text>
          </View>
          <View style={{ padding: 5, flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Check Out Date: </Text>
            <Text>{endDate.toLocaleDateString()}</Text>
          </View>

          <View style={{ padding: 5, flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Room Type: </Text>
            <Text>
              {roomType.name ? roomType.name : "Please select a room type"}
            </Text>
          </View>
          <View style={{ padding: 5, flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>
              {totalPrice > 0 ? `Total Price :  ₺${totalPrice}` : ""}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (isNaN(totalPrice) || totalPrice === 0) {
              Alert.alert("Warning", "Please select all details");
              return;
            }
            addRezervation({
              adultCount: Number(adultCount),
              checkInDate: formatDate(startDate),
              checkOutDate: formatDate(endDate),
              childCount: Number(childCount),
              guestCount: Number(adultCount) + Number(childCount),
              hotelId: doc(db, "hotels/" + hotelData.id),
              roomCount: Number(roomCount),
              roomTypeId: doc(db, "roomTypes/" + roomType.id),
              totalPrice: totalPrice,
              userId: auth.currentUser.uid,
            });
            dispatch(
              addRezervations({
                adultCount: Number(adultCount),
                checkInDate: formatDate(startDate),
                checkOutDate: formatDate(endDate),
                childCount: Number(childCount),
                guestCount: Number(adultCount) + Number(childCount),
                hotelId: doc(db, "hotels/" + hotelData.id),
                roomCount: Number(roomCount),
                roomTypeId: doc(db, "roomTypes/" + roomType.id),
                totalPrice: totalPrice,
                userId: auth.currentUser.uid,
              })
            );

            navigation.navigate("ConfirmScreen");
          }}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookingNewScreen;

const styles = StyleSheet.create({
  mainView: {
    padding: 20,
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
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    justifyContent: "space-between",
  },
  datepicker_view: {
    flexDirection: "column",
    borderColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 1,
  },
  button: {
    borderColor: "#448178",
    borderWidth: 2,
    color: "0D9276",
    borderRadius: 10,
    backgroundColor: "#448178",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    fontSize: 10,
  },
  roomTypeButton: {
    borderColor: "#448178",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#448178",
    width: 110,
    height: 50,
    justifyContent: "center",
    gap: 3,
  },
  confirmText: {
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    fontSize: 20,
  },
});
