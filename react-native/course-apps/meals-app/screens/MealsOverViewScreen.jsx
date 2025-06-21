import { StyleSheet, View, Text } from "react-native";

import { MEALS } from "../data/dummy-data";

function MealsOverViewScreen() {
  return (
    <View style={styles.container}>
      <Text>Meals Overview Screen</Text>
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
