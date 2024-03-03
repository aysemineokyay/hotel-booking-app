import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FooterInfo = ({ data }) => {
  const navigation = useNavigation();
  const handlePress = (data) => {
    // @ts-ignore
    navigation.navigate("BookingNew", { hotelData: data.data });
  };
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Book Now"
          color="white"
          onPress={() => handlePress(data)}
        />
      </View>
    </View>
  );
};

export default FooterInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
    color: "black",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#448178",
    width: "100%",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
});
