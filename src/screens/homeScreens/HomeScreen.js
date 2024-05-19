import {
  StyleSheet,
  FlatList,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import HomeScreen_Header from "../../components/HomeScreen_Header";
import HomeScreen_SearchBar from "../../components/HomeScreen_SearchBar";
import HotelCard from "../../components/HotelCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getHotels,
  selectHotels,
  selectStatus,
  selectUsers,
} from "../../slices/homeScreenSlice";
import { Text } from "react-native";
import { getUsers } from "../../slices/favoriteScreenSlice";

const HomeScreen = () => {
  const hotels = useSelector(selectHotels);
  const users = useSelector(selectUsers);
  const status = useSelector(selectStatus);
  const dispatch = useDispatch();
  const [list, setList] = useState();
  useEffect(() => {
    dispatch(getHotels());
    dispatch(getUsers());
  }, []);
  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }
  const renderHotel = ({ item, index }) => (
    <HotelCard
      data={item}
      index={index}
      user={
        users[0].favorites.length > 0
          ? users[0].favorites.map((fv) => fv.data)
          : []
      }
    />
  );
  const handleSearch = (text) => {
    const filteredList = hotels.filter((place) => {
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
          data={list ? list : hotels}
          renderItem={renderHotel}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  flatlistContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
});
