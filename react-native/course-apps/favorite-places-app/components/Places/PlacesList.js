import { StyleSheet, View, Text, FlatList } from "react-native";

function PlacesList({ places }) {
  return <FlatList data={places} keyExtractor={(item) => item.id} renderItem={} />;
}

const styles = StyleSheet.create({});

export default PlacesList;
