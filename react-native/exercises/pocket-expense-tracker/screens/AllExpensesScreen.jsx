import { useLayoutEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import IconButton from "../components/IconButton";
import { ExpensesContext } from "../store/ExpensesContext";
import ExpenseDashboard from "../components/ExpenseDashboard";

function AllExpensesScreen({ navigation }) {
  const expensesContext = useContext(ExpensesContext);

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

  return <ExpenseDashboard data={expensesContext.expenses} />;
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
