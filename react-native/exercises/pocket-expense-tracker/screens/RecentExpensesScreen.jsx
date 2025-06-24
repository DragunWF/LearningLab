import { useLayoutEffect, useContext } from "react";
import { StyleSheet } from "react-native";

import IconButton from "../components/IconButton";
import ExpenseDashboard from "../components/ExpenseDashboard";
import { ExpensesContext } from "../store/ExpensesContext";
import { isCurrentWeek } from "../helpers/utils";

function RecentExpensesScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const expenseData = expensesContext.expenses.filter((expense) =>
    isCurrentWeek(expense.date)
  );

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

  return <ExpenseDashboard summaryTitle="Last 7 Days" data={expenseData} />;
}

const styles = StyleSheet.create({
  navHeaderButton: {
    marginRight: 20,
  },
});

export default RecentExpensesScreen;
