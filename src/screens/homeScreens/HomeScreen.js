import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import HomeScreen_Header from "../../components/HomeScreen_Header";
import HomeScreen_SearchBar from "../../components/HomeScreen_SearchBar";
import HotelCard from "../../components/HotelCard";
import hotel_data from "../../../data/hotel_data.json";
import { useDispatch, useSelector } from "react-redux";
import { getHotels, selectHotels } from "../../slices/homeScreenSlice";
import { selectError, selectStatus } from "../../slices/bookingScreenSlice";

const HomeScreen = () => {
  const [list, setList] = useState();
  const hotels = useSelector(selectHotels);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotels());
  }, []);
  // console.log("hotels", hotels[0].name);
  const renderHotel = ({ item }) => (
    <HotelCard
      id={item.id}
      place={item.city}
      placeImage={item.image}
      hotelName={item.name}
      newPrice={item.rating}
    />
  );

  const handleSearch = (text) => {
    const filteredList = hotels[0].filter((place) => {
      const searchedText = text.toLowerCase();
      const currentTitle = place.city.toLowerCase();
      return currentTitle.indexOf(searchedText) > -1;
    });
    setList(filteredList);
  };

  return (
    <View style={styles.container}>
      <HomeScreen_Header />
      <HomeScreen_SearchBar onSearch={handleSearch} />
      <View style={styles.flatlistContainer}>
        <FlatList
          data={hotels}
          renderItem={renderHotel}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 50,
    marginBottom: 250,
  },
  flatlistContainer: {
    alignItems: "center",
    marginBottom: "auto",
  },
});
