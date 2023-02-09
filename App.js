import { useCallback, useEffect, useReducer, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { getList } from "./api/picsum";
import { actionCreators, initialState, reducer } from "./reducers/photos";
import PhotoGrid from "./components/PhotoGrid";

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, error, photos, nextPage } = state;

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading());

    try {
      const nextPhotos = await getList(nextPage);
      dispatch(actionCreators.success(nextPhotos, nextPage));
    } catch (e) {
      dispatch(actionCreators.failure());
    }
  }, [nextPage]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  // show error if first page fails to load
  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      );
    }
  }
  return (
    <PhotoGrid numColumns={3} photos={photos} onEndReached={fetchPhotos} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
