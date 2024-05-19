import { StyleSheet, TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const HomeScreen_SearchBar = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <EvilIcons name="location" size={24} color="black" />
        <TextInput
          placeholder="Search your hotel..."
          onChangeText={props.onSearch}
        />
      </View>
    </View>
  );
};

export default HomeScreen_SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    fontSize: 20,
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 30,
  },
});
