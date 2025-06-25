import { useLayoutEffect, useContext } from "react";
import { StyleSheet } from "react-native";

import ExpenseDashboard from "../components/ExpenseDashboard";
import { ExpensesContext } from "../store/ExpensesContext";
import useHeaderButton from "../helpers/useHeaderButton";
import { getSortedExpensesByDate } from "../helpers/utils";

function AllExpensesScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const expenseData = getSortedExpensesByDate(expensesContext.expenses);

  useHeaderButton(navigation, "add", expensesContext.openAddExpenseForm);

  return <ExpenseDashboard summaryTitle="Total" data={expenseData} />;
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
