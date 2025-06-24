import { useLayoutEffect, useContext } from "react";
import { StyleSheet } from "react-native";

import IconButton from "../components/IconButton";
import { ExpensesContext } from "../store/ExpensesContext";
import ExpenseDashboard from "../components/ExpenseDashboard";

function RecentExpensesScreen({ navigation }) {
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
  navHeaderButton: {
    marginRight: 20,
  },
});

export default RecentExpensesScreen;
