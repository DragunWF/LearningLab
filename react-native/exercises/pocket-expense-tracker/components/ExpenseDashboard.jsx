import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ExpenseSummaryCard from "./TitleCard";
import ExpenseList from "./ExpenseList";
import { formatNumber, getTotalExpenses } from "../helpers/utils";

function ExpenseDashboard({ data }) {
  const totalExpenses = getTotalExpenses(data);

  return (
    <LinearGradient style={styles.screen} colors={["#03346E", "#6EACDA"]}>
      <View style={styles.container}>
        <ExpenseSummaryCard
          subHeaderText="Last 7 Days"
          totalText={formatNumber(totalExpenses)}
        />
        <View style={styles.expensesContainer}>
          <ExpenseList data={data} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  expensesContainer: {
    marginTop: 20,
    paddingBottom: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ExpenseDashboard;
