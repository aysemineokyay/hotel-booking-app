import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Details = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Detay Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source.         
    
      </Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:30,
    alignItems:"center",
    marginBottom: "auto",
  },
  text:{
    paddingVertical:30,
    fontSize:14,
    lineHeight: 25,
    textAlign:"justify",
    },
});
