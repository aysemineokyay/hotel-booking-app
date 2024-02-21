import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

function useLocation() {
  const [location, setLocation] = useState(null);

  useEffect (()=>{
    Location.requestForegroundPermissionsAsync().then((permission)=>{
    if(permission.status !== "granted"){
      return;
    }
    Location.getCurrentPositionAsync().then((location)=>{
      setLocation(location);
    });
    });
  }, []);
  return location;
}

export default useLocation;