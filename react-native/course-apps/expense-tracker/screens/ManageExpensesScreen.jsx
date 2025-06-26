import { useLayoutEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

function ManageExpensesScreen({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return (
    <View>
      <Text>ManageExpensesScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ManageExpensesScreen;
