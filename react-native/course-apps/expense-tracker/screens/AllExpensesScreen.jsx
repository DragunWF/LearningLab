import { StyleSheet, View, Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpensesScreen() {
  return <ExpensesOutput expensesPeriod="Total" />;
}

const styles = StyleSheet.create({});

export default AllExpensesScreen;
