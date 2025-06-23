import { StyleSheet, View, FlatList } from "react-native";
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
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExpenseList;
