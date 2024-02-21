import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import HomeScreen_Header from "../../components/HomeScreen_Header";
import HomeScreen_SearchBar from "../../components/HomeScreen_SearchBar";
import HotelCard from "../../components/HotelCard";
import hotel_data from "../../../data/hotel_data.json";

const HomeScreen = () => {
  const [list, setList] = useState(hotel_data);
  const renderHotel = ({ item }) => (
    <HotelCard
      place={item.place}
      placeImage={item.placeImage}
      hotelName={item.properties[0].hotelName}
      newPrice={item.properties[0].newPrice}
    />
  );

  const handleSearch = (text) => {
    const filteredList = hotel_data.filter((place) => {
      const searchedText = text.toLowerCase();
      const currentTitle = place.place.toLowerCase();
      return currentTitle.indexOf(searchedText) > -1;
    });
    setList(filteredList);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <HomeScreen_Header />
        <HomeScreen_SearchBar onSearch={handleSearch} />
        <View style={styles.flatlistContainer}>
          <FlatList
            data={list}
            renderItem={renderHotel}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
        </View>
      </View>
    </SafeAreaView>
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
