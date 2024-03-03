import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

function useLocation() {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then((permission) => {
      if (permission.status !== "granted") {
        return;
      }
      const loc = {
        latitude: 41.06243,
        longitude: 28.94101,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      };
      setLocation(loc);
      //   Location.getCurrentPositionAsync().then((location) => {
      //     setLocation(location);
      //   });

      //   Location.watchPositionAsync(
      //     {
      //       accuracy: Location.Accuracy.BestForNavigation,
      //       timeInterval: 5000,
      //       distanceInterval: 10,
      //     },
      //     (location) => {
      //       setLocation(location);
      //     }
      //   );
    });
  }, []);

  return location;
}

export default useLocation;

const styles = StyleSheet.create({});

// import { useState, useEffect } from "react";

// import * as Location from "expo-location";

// function useLocation() {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     Location.requestForegroundPermissionsAsync().then((permission) => {
//       if (permission.status !== "granted") {
//         return;
//       }
//       Location.getCurrentPositionAsync().then((location) => {
//         setLocation(location);
//       });
//       Location.watchPositionAsync(
//         {
//           accuracy: Location.Accuracy.BestForNavigation,
//           timeInterval: 1000,
//           distanceInterval: 10,
//         },
//         (location) => {
//           setLocation(location);
//         }
//       );
//     });
//   }, []);

//   return location;
// }

// export default useLocation;
