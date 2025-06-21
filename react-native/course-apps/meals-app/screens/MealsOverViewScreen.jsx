import { StyleSheet, View, FlatList } from "react-native";
// import { useRoute } from "@react-navigation/native";

import { MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";

function MealsOverViewScreen({ route }) {
  const categoryId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.includes(categoryId);
  });

  function renderMealItem(itemData) {
    return <MealItem title={itemData.item.title} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
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
