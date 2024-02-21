import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const FooterInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>$200.00</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Rezervasyon Yap</Text>
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
