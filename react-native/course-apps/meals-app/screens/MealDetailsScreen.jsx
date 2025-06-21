import { StyleSheet, View, Text } from "react-native";

function MealDetailsScreen({ route, navigation }) {
  const mealId = route.params.mealId;

  return (
    <View>
      <Text>{mealId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default MealDetailsScreen;
