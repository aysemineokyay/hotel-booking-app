import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../hooks/useLocation";
import useCompass from "../hooks/useCompass";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Map = () => {
  const location = useLocation();
  const data = useCompass();
  console.log(data);

  const navigation = useNavigation();

  const hotelLatitude = 36.8848; 
  const hotelLongitude = 30.7040; 
  const initialRegion = location
    ? {
        latitude: hotelLatitude,
        longitude: hotelLongitude,
        // Zoom değerleri
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }
    : null;

  const coordinate = initialRegion
    ? {
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      }
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={20} color="grey" />
        <Text style={styles.backButtonText}>Geri</Text>
      </TouchableOpacity>
      <MapView 
      style={styles.map} 
      initialRegion={initialRegion}>
        {coordinate && (
          <Marker
            coordinate={coordinate}
         
          >
            <Image
              source={require("../../data/pin.png")}
              style={{
                width: 30,
                height: 35,
                transform: [{ rotate: `${((data.y + 45) * 180) / 720}deg` }],
              }}
            />
          </Marker>
        )}
      </MapView>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
 flex:1
  },
  map: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    zIndex:1,
    position: "absolute",
    top: 50,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 7,
    color: "grey",
    fontWeight: "bold",
    fontSize: 20,
  },
});
