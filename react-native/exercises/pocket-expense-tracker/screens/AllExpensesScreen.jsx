import { StyleSheet, View, Text } from "react-native";

import ExpenseSummaryCard from "../components/TitleCard";

function AllExpensesScreen() {
  return (
    <View style={styles.container}>
      <ExpenseSummaryCard subHeaderText="Total" totalText="₱ 0.00" />
      <View style={styles.expensesContainer}>
        <Text>Expense List</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerContainer: {
    marginTop: 20,
  },
  expensesContainer: {},
});

export default AllExpensesScreen;
