import { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function RecentExpensesScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      const expenses = await fetchExpenses();
      expensesContext.setExpenses(expenses);
      setIsLoading(false);
    }

    getExpenses();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered within the last 7 days!"
    />
  );
}

const styles = StyleSheet.create({});

export default RecentExpensesScreen;
