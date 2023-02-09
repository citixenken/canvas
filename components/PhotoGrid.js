import { Dimensions, FlatList, Image, StyleSheet } from "react-native";
import React from "react";

import { formatPhotoUri } from "../api/picsum";

const PhotoGrid = ({ photos, numColumns, onEndReached }) => {
  const { width } = Dimensions.get("window");
  const size = width / numColumns;
  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <Image
          source={{
            width: size,
            height: size,
            uri: formatPhotoUri(item.id, size, size),
          }}
        />
      )}
    />
  );
};

export default PhotoGrid;

const styles = StyleSheet.create({});
