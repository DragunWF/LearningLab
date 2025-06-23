import { useLayoutEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ExpenseSummaryCard from "../components/TitleCard";
import IconButton from "../components/IconButton";
import ExpenseList from "../components/ExpenseList";
import { ExpensesContext } from "../store/ExpensesContext";
import { getTotalExpenses, formatNumber } from "../helpers/utils";

function RecentExpensesScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const totalExpenses = getTotalExpenses(expensesContext.expenses);

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
    <LinearGradient style={styles.screen} colors={["#03346E", "#6EACDA"]}>
      <View style={styles.container}>
        <ExpenseSummaryCard
          subHeaderText="Last 7 Days"
          totalText={formatNumber(totalExpenses)}
        />
        <View style={styles.expensesContainer}>
          <ExpenseList data={expensesContext.expenses} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navHeaderButton: {
    marginRight: 20,
  },
  expensesContainer: {
    marginTop: 20,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RecentExpensesScreen;
