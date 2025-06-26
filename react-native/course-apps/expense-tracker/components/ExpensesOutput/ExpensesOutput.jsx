import { StyleSheet, View } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses }) {
  return (
    <View>
      <ExpensesSummary />
      <ExpensesList />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ExpensesOutput;
