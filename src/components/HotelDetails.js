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

import {
  getHotelsAndRoomTypes,
  selectData,
  selectError,
  selectHotels,
  selectStatus,
} from "../slices/homeScreenSlice";
import { LogBox } from "react-native";


const HotelDetails = ({ route }) => {
  const hotels = useSelector(selectHotels);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const data = useSelector(selectData);
  const dispatch = useDispatch();
  const dataHotel = route.params;
  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);
  console.log("dataHotel", dataHotel);
  useEffect(() => {
    dispatch(getHotelsAndRoomTypes(dataHotel.data.ref));
  }, []);

  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const cards = [1, 2, 3, 4];
  const CARD_WIDTH = 346;
  console.log(
    "dataaaaaaaa",
    data[0].roomTypes.map((item) => item)
  );
  // const [selectedTab, setSelectedTab] = useState("Details");
  // const renderContent = () => {
  //   if (selectedTab === "Details") {
  //     return (
  //       <ScrollView>
  //         <Details />
  //       </ScrollView>
  //     );
  //   } else if (selectedTab === "Trip Plan") {
  //     return (
  //       <ScrollView>
  //         <TripPlan />
  //       </ScrollView>
  //     );
  //   } else if (selectedTab === "Review") {
  //     return (
  //       <ScrollView>
  //         <Reviews />
  //       </ScrollView>
  //     );
  //   }
  // };
  // const handleTabPress = (tabTitle) => {
  //   setSelectedTab(tabTitle);
  // };

  // console.log("dataaaaaaaa", data[0].roomTypes);
 

  const navigation = useNavigation();

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image style={styles.image} source={{ uri: item }} />
    </View>
  );

  const onPress = () => {
    // @ts-ignore
    navigation.navigate("Map", { data: dataHotel.data });
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
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
          // Kart listesi
          data={dataHotel.data.detail_images}
          // Render edilecek component (Card)
          renderItem={renderCarouselItem}
          // Listeleme için key
          keyExtractor={(item) => item.toString()}
          // Yatayda dizmek için
          horizontal={true}
          // Cardlar arası genişlik
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          // ListView'ın container stili
          contentContainerStyle={{ padding: 16 }}
          // Native scroll indicator'ı kaldırmak için
          showsHorizontalScrollIndicator={false}
          // Sayfalama yapması için
          pagingEnabled={true}
          // Card'ların yapışması için verdiğimiz array
          // CardWidth + ItemSeparatorComponent
          // 330 + 16 = 346
          // Yani bu piksellerde duracak
          // [346, 692, 1038, 1384, 1730, 2076, 2422, 2768, 3114]
          snapToOffsets={cards.map((_, i) => i * CARD_WIDTH)}
          // Hızlı kaydırma için
          decelerationRate={"fast"}
          // Scroll edildiğinde çalışır
          onScroll={(e) => {
            const newIndex = Math.round(
              e.nativeEvent.contentOffset.x / CARD_WIDTH
            );
            setActiveDotIndex(newIndex);
          }}
        />
        {/* Dots */}
        <View style={styles.dotContainer}>
          {cards.map((_, i) =>
            i === activeDotIndex ? (
              <View key={i} style={[styles.dot, styles.activeDot]} />
            ) : (
              <View key={i} style={styles.dot} />
            )
          )}
        </View>

        <View style={{ flexDirection: "column", gap: 5 }}>
          <View style={styles.infoContainer}>
            <View style={styles.hotelNameContainer}>
              <Text style={styles.hotelName}>{dataHotel.data.name}</Text>
            </View>
            <View style={styles.rateContainer}>
              <AntDesign name="star" size={22} color="gold" />
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
   <View style={styles.description}>
          <Text style={styles.textTitle}>Details</Text>
          <Text style={styles.descriptionText}>
            {dataHotel.data.description}
          </Text>
        </View>

      <FooterInfo data={dataHotel} />
    </View>
 </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselItem: {
    width: 330,
    height: 200,
    justifyContent: "space-between",
  },
  image: {
    width: 330,
    height: 200,
    resizeMode: "cover",
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  dot: {
    backgroundColor: "#efefef",
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: "#333",
    width: 10,
  },

  // backButton: {
  //   position: "absolute",
  //   top: 50,
  //   left: 10,
  //   flexDirection: "row",
  //   alignItems: "center",
  // },
  // backButtonText: {
  //   marginLeft: 7,
  //   color: "white",
  //   fontWeight: "bold",
  //   fontSize: 20,
  // },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
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
  description: { marginTop: 20 },
  descriptionText: {
    fontSize: 16,
    textAlign: "justify",
  },
  textTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
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
