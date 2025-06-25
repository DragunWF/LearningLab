import { useLayoutEffect, useContext } from "react";
import { StyleSheet } from "react-native";

import ExpenseDashboard from "../components/ExpenseDashboard";
import { ExpensesContext } from "../store/ExpensesContext";
import useHeaderButton from "../helpers/useHeaderButton";

function AllExpensesScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);

  useHeaderButton(navigation, "add", expensesContext.openExpenseForm);

  return (
    <ExpenseDashboard summaryTitle="Total" data={expensesContext.expenses} />
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
