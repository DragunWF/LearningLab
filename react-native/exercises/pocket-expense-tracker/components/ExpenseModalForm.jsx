import { useState, useContext } from "react";
import { StyleSheet, View, Text, Modal, TextInput } from "react-native";

import PrimaryButton from "./PrimaryButton";
import { ExpensesContext } from "../store/ExpensesContext";

function ExpenseModalForm({ isVisible }) {
  const expensesContext = useContext(ExpensesContext);

  const [expenseName, setExpenseName] = useState("");
  const [moneySpent, setMoneySpent] = useState("");

  function expenseNameInputHandler(enteredName) {
    setExpenseName(enteredName);
  }

  function moneySpentInputHandler(enteredMoney) {
    setMoneySpent(enteredMoney);
  }

  function onSubmit() {}

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Expense Name"
          onChange={expenseNameInputHandler}
        />
        <TextInput
          placeholder="Money Spent"
          onChange={moneySpentInputHandler}
          keyboardType="number-pad"
        />
        <PrimaryButton onPress={onSubmit} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
});

export default ExpenseModalForm;
