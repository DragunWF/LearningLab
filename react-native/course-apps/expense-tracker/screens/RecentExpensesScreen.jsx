import { StyleSheet, View, Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function RecentExpensesScreen() {
  return <ExpensesOutput expensesPeriod="Last 7 Days" />;
}

const styles = StyleSheet.create({});

export default RecentExpensesScreen;
