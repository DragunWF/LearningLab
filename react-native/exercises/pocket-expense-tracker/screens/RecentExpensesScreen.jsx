import { useContext } from "react";
import { StyleSheet } from "react-native";

import ExpenseDashboard from "../components/ExpenseDashboard";
import useHeaderButton from "../helpers/useHeaderButton";
import { ExpensesContext } from "../store/ExpensesContext";
import { isCurrentWeek, getSortedExpensesByDate } from "../helpers/utils";

function RecentExpensesScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);

  // Makes sure that the expenses shown are from the last 7 days
  const expenseData = getSortedExpensesByDate(
    expensesContext.expenses.filter((expense) => isCurrentWeek(expense.date))
  );

  useHeaderButton(navigation, "add", expensesContext.openAddExpenseForm);

  return <ExpenseDashboard summaryTitle="Last 7 Days" data={expenseData} />;
}

const styles = StyleSheet.create({});

export default RecentExpensesScreen;
