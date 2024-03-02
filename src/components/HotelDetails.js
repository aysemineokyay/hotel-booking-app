import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel-new";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import Map from "./Map";
import HotelDetailsButton from "./CustomButton";
import { useEffect, useState } from "react";
import Details from "./Details";
import TripPlan from "./TripPlan";
import Reviews from "./Reviews";
import FooterInfo from "./FooterInfo";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsAndRoomTypes, selectData, selectError, selectHotels, selectStatus } from "../slices/homeScreenSlice";

const HotelDetails = ({ route }) => {
  const hotels = useSelector(selectHotels);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const data = useSelector(selectData);
  const dispatch = useDispatch();
  const dataHotel = route.params;
  console.log("dataHotel", dataHotel);
  useEffect(() => {
    dispatch(getHotelsAndRoomTypes(dataHotel.data.ref));
  }, []);
  // console.log("dataaaaaaaa", data[0].roomTypes);
  const [selectedTab, setSelectedTab] = useState("Details");
  const renderContent = () => {
    if (selectedTab === "Details") {
      return (
        <ScrollView>
          <Details />
        </ScrollView>
      );
    } else if (selectedTab === "Trip Plan") {
      return (
        <ScrollView>
          <TripPlan />
        </ScrollView>
      );
    } else if (selectedTab === "Review") {
      return (
        <ScrollView>
          <Reviews />
        </ScrollView>
      );
    }
  };
  const handleTabPress = (tabTitle) => {
    setSelectedTab(tabTitle);
  };

  const navigation = useNavigation();

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image style={styles.image} source={{ uri: item }} />
    </View>
  );

  const onPress = () => {
    // @ts-ignore
    navigation.navigate("Map");
  };

  return (
    <View style={styles.container}>
      {/* <Carousel
        data={dataHotel.data.detail_images}
        renderItem={renderCarouselItem}
        sliderWidth={410}
        itemWidth={410}
        layout="default"
        loop={true}
      /> */}
      <FlatList
        data={dataHotel.data.detail_images}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCarouselItem}
        contentContainerStyle={{
          justifyContent: "space-between",
          height: 250,
          marginVertical: 50,
          alignContent: "center",
          alignItems: "center",
          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 3,
          // },
          // shadowOpacity: 0.2,
          // shadowRadius: 12.35,

          // elevation: 19,
        }}
        // ItemSeparatorComponent={() => (
        //   <View
        //     style={{
        //       width: 4,
        //     }}
        //   />
        // )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        pagingEnabled={true}
        snapToOffsets={dataHotel.data.detail_images.map((_, i) => i * 346)}
        showsHorizontalScrollIndicator={true}
        decelerationRate={"fast"}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={20} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "column", gap: 5 }}>
        <View style={styles.infoContainer}>
          <View style={styles.hotelNameContainer}>
            <Text style={styles.hotelName}>{dataHotel.data.name}</Text>
          </View>
          <View style={styles.rateContainer}>
            <AntDesign name="star" size={22} color="orange" />
            <Text style={styles.rate}>{dataHotel.data.rating}</Text>
          </View>
        </View>
        <View style={styles.placeNameContainer}>
          <EvilIcons name="location" size={24} color="black" />
          <Text style={styles.placeNameText}>{dataHotel.data.city}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <ImageBackground source={require("../../assets/map.png")} resizeMode="cover" style={styles.mapContainer}>
          <Text style={styles.buttonText}>Show on map</Text>
        </ImageBackground>
      </TouchableOpacity>

      <HotelDetailsButton onTabPress={handleTabPress} selectedTab={selectedTab} />
      {renderContent()}

      <FooterInfo data={dataHotel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  carouselItem: {
    width: 350,
    height: 230,
  },
  image: {
    width: 320,
    height: 230,
    resizeMode: "cover",
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
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
    fontSize: 20,
  },
  infoContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  hotelNameContainer: {},
  hotelName: {
    fontSize: 20,
    fontWeight: "700",
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rate: {
    color: "#00000077",
    fontSize: 16,
  },
  placeNameContainer: {
    flexDirection: "row",
    width: "100%",
  },
  placeNameText: {
    color: "#00000077",
  },
  mapContainer: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  button: {
    marginTop: 20,
    width: "100%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: "20%",
    fontWeight: "bold",
  },
});

export default HotelDetails;
