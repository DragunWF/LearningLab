import { StyleSheet, View, Text, FlatList } from "react-native";
import ExpenseCard from "./ExpenseCard";

function ExpenseList({ data }) {
  function renderExpenseItem(itemData) {
    return (
      <ExpenseCard
        name={itemData.item.name}
        date={itemData.item.date}
        expense={itemData.item.expense}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
      alwaysBounceVertical={false}
    />
  );
}

const styles = StyleSheet.create({});

export default ExpenseList;
