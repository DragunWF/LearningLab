import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpensesScreen() {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

const styles = StyleSheet.create({});

export default AllExpensesScreen;
