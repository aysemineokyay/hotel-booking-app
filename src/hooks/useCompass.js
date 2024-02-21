import { useState, useEffect } from "react";
import { Magnetometer } from "expo-sensors";

function useCompass() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    Magnetometer.setUpdateInterval(10);
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(result);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return data;
}

export default useCompass;
