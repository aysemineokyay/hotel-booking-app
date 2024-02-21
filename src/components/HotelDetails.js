import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel-new";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import Map from "./Map";
import HotelDetailsButton from "./CustomButton";
import { useState } from "react";
import Details from "./Details";
import TripPlan from "./TripPlan";
import Reviews from "./Reviews";
import FooterInfo from "./FooterInfo";
import { SafeAreaView } from "react-native-safe-area-context";

const hotelData = [
  { placeImage: require("../../data/otel1.jpg") },
  { placeImage: require("../../data/otel2.jpg") },
  { placeImage: require("../../data/otel1.jpg") },
  { placeImage: require("../../data/otel2.jpg") },
];
const HotelDetails = (props) => {
  const [selectedTab, setSelectedTab] = useState("Detaylar");
  const renderContent = () => {
    if (selectedTab === "Detaylar") {
      return (
        <ScrollView>
          <Details />
        </ScrollView>
      );
    } else if (selectedTab === "Seyahat Planı") {
      return (
        <ScrollView>
          <TripPlan />
        </ScrollView>
      );
    } else if (selectedTab === "Yorumlar") {
      return (
        <ScrollView>
          <Reviews />
        </ScrollView>
      );
    }
  };

  const handleTabPress = (tabTitle) => {
    setSelectedTab(tabTitle);
    console.log(`${tabTitle} sekmesine geçildi`);
  };

  const navigation = useNavigation();

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image style={styles.image} source={item.placeImage} />
    </View>
  );

  const onPress = () => {
    navigation.navigate("Map");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Carousel
        data={hotelData}
        renderItem={renderCarouselItem}
        sliderWidth={410}
        itemWidth={410}
        layout="default"
        loop={true}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={20} color="white" />
        <Text style={styles.backButtonText}>Geri</Text>
      </TouchableOpacity>

      <View style={styles.info}>
        <View style={styles.infoContainer}>
          <View style={styles.hotelNameContainer}>
            <Text style={styles.hotelName}>Panshi Hotel </Text>
          </View>
          <View style={styles.rateContainer}>
            <AntDesign name="star" size={22} color="orange" />
            <Text style={styles.rate}>4.2</Text>
          </View>
        </View>
        <View style={styles.placeNameContainer}>
          <EvilIcons name="location" size={24} color="black" />
          <Text style={styles.placeNameText}>Bangladesh</Text>
        </View>
      </View>
  
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Haritada Gör</Text>
        </TouchableOpacity>

        <HotelDetailsButton
          onTabPress={handleTabPress}
          selectedTab={selectedTab}
        />
        {renderContent()}
  
<FooterInfo/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  carouselItem: {
    width: "100%",
    height: 220,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hotelNameContainer: {},
  hotelName: {
    fontSize: 24,
    fontWeight: "700",
  },
  rateContainer: {
    paddingLeft: 150,
    flexDirection: "row",
    alignItems: "center",
  },
  rate: {
    color: "gray",
    paddingLeft: 5,
    fontSize: 16,
  },
  placeNameContainer: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 5,
  },
  placeNameText: {
    color: "#AAAAAA",
  },
  mapContainer: {
    width: 100,
    height: 100,
  },
  button: {
    marginTop: 20,
    width: 350,
    height: 100,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },

});

export default HotelDetails;
