import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FavoriteScreen = () => {

  const navigation = useNavigation();
const goToLoginAccountScreen =()=>{
    // @ts-ignore
  navigation.navigate("LoginAccount");
}

  return (
    <View>
      <Text>FavoriteScreen</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={goToLoginAccountScreen}>
        <Text style={styles.buttonText}>Login Account Screen' e git</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  buttonContainer:{
    width:300,
    height:40,
    backgroundColor:"green",
    borderWidth:1,
    borderRadius:15,
    alignItems:"center",
    justifyContent:"center",
    margin:20,
  },
  buttonText:{
    color:"white",
  },
});

