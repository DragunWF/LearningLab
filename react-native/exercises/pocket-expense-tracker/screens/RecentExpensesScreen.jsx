import { useLayoutEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import ExpenseSummaryCard from "../components/TitleCard";
import IconButton from "../components/IconButton";

function RecentExpensesScreen({ navigation }) {
  useLayoutEffect(() => {
    function addExpenseHandler() {
      console.log("Add Expense Button Pressed");
    }

    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            name="add"
            color="black"
            onPress={addExpenseHandler}
            style={styles.navHeaderButton}
          />
        );
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <ExpenseSummaryCard subHeaderText="Last 7 Days" totalText="₱ 0.00" />
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
  navHeaderButton: {
    marginRight: 20,
  },
  expensesContainer: {},
});

export default RecentExpensesScreen;
