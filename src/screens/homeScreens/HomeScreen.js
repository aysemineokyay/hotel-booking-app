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
  selectError,
  selectStatus,
} from "../../slices/homeScreenSlice";
import { Text } from "react-native";

const HomeScreen = () => {
  const [list, setList] = useState();
  const hotels = useSelector(selectHotels);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotels());
  }, []);
  if (status === "loading") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderHotel = ({ item }) => <HotelCard data={item} />;

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
          style={{ gap: 5 }}
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
  },
});
