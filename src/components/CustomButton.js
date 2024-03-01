import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const CustomButton = ({ title, onPress, isActive }) => {
  const buttonStyle = isActive ? styles.activeButton : styles.inactiveButton;
  const textStyle = isActive ? styles.activeButtonText : styles.inactiveButtonText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

const ButtonsCategory = ({ onTabPress, selectedTab }) => {
  return (
    <View style={styles.container}>
      <CustomButton
        title='Details'
        onPress={() => onTabPress('Details')}
        isActive={selectedTab === 'Details'}
      />
      <CustomButton
        title='Trip Plan'
        onPress={() => onTabPress('Trip Plan')}
        isActive={selectedTab === 'Trip Plan'}
      />
       <CustomButton
        title='Review'
        onPress={() => onTabPress('Review')}
        isActive={selectedTab === 'Review'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:15,
    paddingTop: 20,
    backgroundColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    width:360,
    height:50,
    gap:10,
    borderRadius:15,
    paddingHorizontal:30,
    borderWidth:2,
    borderColor:"#F5F5F5",
  },
  activeButton: {
    backgroundColor: "#FFFFFF",
    width: 110,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  inactiveButton: {
    backgroundColor: "#F5F5F5",
    width: 110,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500"
  },
  activeButtonText: {
    color: "green",
    fontSize: 14,
    textTransform: "capitalize",
  },
  inactiveButtonText: {
    color: "#9D9D9D",
    fontSize: 14,
    textTransform: "capitalize",
  }
});

export default ButtonsCategory;
