import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen_Header = () => {
  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>Let Explore the world!</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <FontAwesome name="search" size={20} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="bell" size={20} color="grey" />
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  )
}

export default HomeScreen_Header

const styles = StyleSheet.create({
    container: {
   
        flexDirection: "row",
        paddingHorizontal: 16,
      },
      textContainer: {
        flex: 1,
      },
      iconContainer: {
        flexDirection: "row",
        gap: 15,
        paddingLeft: 100,
        paddingTop: 10,
        alignItems: "baseline",
      },
    
      headerText: {
        fontSize: 24,
        fontWeight: "600",
      },
  
})