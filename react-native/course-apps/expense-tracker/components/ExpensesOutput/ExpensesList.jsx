import { StyleSheet, View, Text, FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";

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
  return <ExpenseItem {...itemData.item} />;
}

const styles = StyleSheet.create({});

export default ExpensesList;
