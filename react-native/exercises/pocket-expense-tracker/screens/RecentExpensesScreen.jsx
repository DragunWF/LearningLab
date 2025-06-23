import { useLayoutEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ExpenseSummaryCard from "../components/TitleCard";
import IconButton from "../components/IconButton";

function RecentExpensesScreen({ navigation }) {
  useLayoutEffect(() => {
    function addExpenseHandler() {
      console.log("Add Expense Button Pressed");
    }

    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            name="add"
            color="black"
            onPress={addExpenseHandler}
            style={styles.navHeaderButton}
          />
        );
      },
    });
  }, []);

  return (
    <LinearGradient style={styles.screen} colors={["#03346E", "#6EACDA"]}>
      <View style={styles.container}>
        <ExpenseSummaryCard subHeaderText="Last 7 Days" totalText="₱ 0.00" />
        <View style={styles.expensesContainer}>
          <Text>Expense List</Text>
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
  navHeaderButton: {
    marginRight: 20,
  },
  expensesContainer: {},
});

export default RecentExpensesScreen;
