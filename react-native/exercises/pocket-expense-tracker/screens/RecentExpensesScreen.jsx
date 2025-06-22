import { useLayoutEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>Recent Expenses Screen</Text>
      </View>
      <View style={styles.expensesContainer}>
        <Text>Expense List</Text>
      </View>
    </View>
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
  navHeaderButton: {
    marginRight: 20,
  },
  expensesContainer: {},
});

export default RecentExpensesScreen;
