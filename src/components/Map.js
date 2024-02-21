import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../hooks/useLocation";
import useCompass from "../hooks/useCompass";

const Map = () => {
  const location = useLocation();
  const data = useCompass();
  console.log(data);
  const initialRegion = location
    ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
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
      <MapView style={styles.map} initialRegion={initialRegion}>
        {coordinate && (
          <Marker
            coordinate={coordinate}
            title="İstanbul"
            description="İstanbul"
          >
            <Image
              source={require("../../data/pin.png")}
              style={{
                width: 50,
                height: 50,
                transform: [{ rotate: `${((data.y + 45) * 180) / 90}deg` }],
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
  container: {flex:1},
  map: {
    width: "100%",
    height: "67%",
  },
  
});
