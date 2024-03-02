import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FooterInfo = ({ data }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    console.log("hotel data:", data.data);
    // @ts-ignore
    navigation.navigate("BookingNew", { hotelData: data });
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>$200.00</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FooterInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
    marginBottom: "auto",
  },
  textContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    fontWeight: "800",
    color: "black",
  },
  button: {
    width: 180,
    height: 40,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    fontSize: 14,
    color: "white",
  },
});
