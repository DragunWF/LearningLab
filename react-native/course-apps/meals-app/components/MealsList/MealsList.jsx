import { StyleSheet, View, FlatList } from "react-native";

import MealItem from "../MealItem";

function MealsList({ items, navigation }) {
  function renderMealItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealDetails", {
        mealId: itemData.item.id,
      });
    }

    const item = itemData.item;
    const mealItemProps = {
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      affordability: item.affordability,
      complexity: item.complexity,
    };
    return <MealItem {...mealItemProps} onPress={pressHandler} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
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

export default MealsList;
