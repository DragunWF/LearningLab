import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/Places/PlacesList";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currentPlaces) => [
        ...currentPlaces,
        route.params.place,
      ]);
    }
  }, [isFocused, route.params]);

  return <PlacesList places={loadedPlaces} />;
}

const styles = StyleSheet.create({});

export default AllPlaces;
