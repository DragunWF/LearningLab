import { StyleSheet, View, Text } from "react-native";

function AllExpensesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>All Expenses</Text>
      </View>
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
