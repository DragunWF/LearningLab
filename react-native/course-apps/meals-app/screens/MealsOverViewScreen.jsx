import { StyleSheet, View, Text } from "react-native";
// import { useRoute } from "@react-navigation/native";

import { MEALS } from "../data/dummy-data";

function MealsOverViewScreen({ route }) {
  const categoryId = route.params.categoryId;

  return (
    <View style={styles.container}>
      <Text>Meals Overview Screen - {categoryId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MealsOverViewScreen;
