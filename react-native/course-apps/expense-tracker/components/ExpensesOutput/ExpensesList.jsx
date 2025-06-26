import { StyleSheet, View, Text, FlatList } from "react-native";

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      alwaysBounceVertical={false}
    />
  );
}

function renderExpenseItem(itemData) {
  return <Text>{itemData.item.description}</Text>;
}

const styles = StyleSheet.create({});

export default ExpensesList;
