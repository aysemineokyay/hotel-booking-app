import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoritesCard from "../../components/FavoritesCard";
import { getUsers, selectUsers } from "../../slices/favoriteScreenSlice";

const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [users]);

  return (
    <View style={styles.container}>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={users[0].favorites}
          renderItem={({ item }) => <FavoritesCard dataFavorites={item} />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", gap: 10 }}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text}>Favorites bulunmamaktadır.</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  flatlistContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  text: { fontSize: 20 },
});
