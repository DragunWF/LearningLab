import { useLayoutEffect, useContext } from "react";
import { StyleSheet } from "react-native";

import IconButton from "../components/IconButton";
import ExpenseDashboard from "../components/ExpenseDashboard";
import { ExpensesContext } from "../store/ExpensesContext";
import { isCurrentWeek } from "../helpers/utils";
import useHeaderButton from "../helpers/useHeaderButton";

function RecentExpensesScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);

  // Makes sure that the expenses shown are from the last 7 days
  const expenseData = expensesContext.expenses.filter((expense) =>
    isCurrentWeek(expense.date)
  );

  useHeaderButton(navigation, "add", expensesContext.openExpenseForm);

  return <ExpenseDashboard summaryTitle="Last 7 Days" data={expenseData} />;
}

const styles = StyleSheet.create({
  navHeaderButton: {
    marginRight: 20,
  },
});

export default RecentExpensesScreen;
