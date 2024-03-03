import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { AntDesign } from "@expo/vector-icons";
import MapView, { Circle, Marker } from "react-native-maps";
import useLocation from "../hooks/useLocation";

const Map = ({ navigation, route }) => {
  const data = route.params.data;

  useEffect(() => {
    navigation.setOptions({ headerTitle: `${data.name}` });
    map.current.animateToRegion({
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      latitudeDelta: 0.3,
      longitudeDelta: 0.3,
    });
  }, [data]);

  const location = useLocation();
  const map = useRef(null);
  const initialRegion = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta,
      }
    : null;
  const coordinate = data
    ? {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      }
    : null;
  const handleZoom = (type) => {
    map.current.getCamera().then((camera) => {
      if (type === "ZOOM_IN") {
        camera.altitude /= 2;
      } else {
        camera.altitude *= 2;
      }
      map.current.animateCamera(camera);
    });
  };
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={coordinate} ref={map}>
        {coordinate && (
          <Marker
            coordinate={coordinate}
            title={data.name}
            description={data.city}
          />
        )}
      </MapView>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => handleZoom("ZOOM_IN")}>
          <AntDesign name="pluscircleo" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleZoom("ZOOM_OUT")}>
          <AntDesign name="minuscircleo" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: { flex: 1 },
  controls: {
    backgroundColor: "white",
    position: "absolute",
    right: 10,
    bottom: 320,
    borderRadius: 5,
    padding: 5,
    gap: 10,
  },
  blueDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
  },
  card: {
    backgroundColor: "dodgerblue",
    width: "100%",
    height: 300,
    gap: 20,
    paddingHorizontal: 30,
    paddingVertical: 25,
  },
  content: {
    flexDirection: "row",
    gap: 10,
  },
  hr: {
    borderBottomColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textTitle: { color: "white", fontSize: 20, fontWeight: "600" },
  text: { color: "white", fontSize: 16, flex: 1 },
});

// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import useLocation from "../hooks/useLocation";
// import useCompass from "../hooks/useCompass";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// const Map = () => {
//   const location = useLocation();
//   const data = useCompass();
//   const navigation = useNavigation();

//   const hotelLatitude = 36.8848;
//   const hotelLongitude = 30.7040;
//   const initialRegion = location
//     ? {
//         latitude: hotelLatitude,
//         longitude: hotelLongitude,
//         // Zoom değerleri
//         latitudeDelta: 0.1,
//         longitudeDelta: 0.1,
//       }
//     : null;

//   const coordinate = initialRegion
//     ? {
//         latitude: initialRegion.latitude,
//         longitude: initialRegion.longitude,
//       }
//     : null;

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}
//       >
//         <Ionicons name="chevron-back" size={20} color="grey" />
//         <Text style={styles.backButtonText}>Back</Text>
//       </TouchableOpacity>
//       <MapView
//       style={styles.map}
//       initialRegion={initialRegion}>
//         {coordinate && (
//           <Marker
//             coordinate={coordinate}

//           >
//             <Image
//               source={require("../../data/pin.png")}
//               style={{
//                 width: 30,
//                 height: 35,
//                 transform: [{ rotate: `${((data.y + 45) * 180) / 720}deg` }],
//               }}
//             />
//           </Marker>
//         )}
//       </MapView>
//     </View>
//   );
// };

// export default Map;

// const styles = StyleSheet.create({
//   container: {
//  flex:1
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
//   backButton: {
//     zIndex:1,
//     position: "absolute",
//     top: 50,
//     left: 10,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   backButtonText: {
//     marginLeft: 7,
//     color: "grey",
//     fontWeight: "bold",
//     fontSize: 20,
//   },
// });
