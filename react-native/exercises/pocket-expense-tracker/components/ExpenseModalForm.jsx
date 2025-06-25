import { useState, useContext } from "react";
import { StyleSheet, View, Text, Modal, TextInput } from "react-native";

import PrimaryButton from "./PrimaryButton";
import { ExpensesContext } from "../store/ExpensesContext";

function ExpenseModalForm({ isVisible, isEditForm }) {
  const expensesContext = useContext(ExpensesContext);

  const [expenseName, setExpenseName] = useState("");
  const [moneySpent, setMoneySpent] = useState("");

  function expenseNameInputHandler(enteredName) {
    setExpenseName(enteredName);
  }

  function moneySpentInputHandler(enteredMoney) {
    setMoneySpent(enteredMoney);
  }

  function deleteExpense() {}

  function onSubmit() {
    if (isEditForm) {
    } else {
    }
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.rootContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Expense Form</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Expense Name"
            onChange={expenseNameInputHandler}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Money Spent"
            onChange={moneySpentInputHandler}
            keyboardType="number-pad"
          />
          <View style={styles.buttonsContainer}>
            <PrimaryButton
              style={styles.backButton}
              onPress={expensesContext.closeExpenseForm}
            >
              Back
            </PrimaryButton>
            <PrimaryButton style={styles.deleteButton} onPress={deleteExpense}>
              Delete
            </PrimaryButton>
            <PrimaryButton onPress={onSubmit}>Submit</PrimaryButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021526",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  title: {
    fontSize: 18,
    color: "white",
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 15,
    marginTop: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#3DC2EC",
    backgroundColor: "#3DC2EC",
    maxWidth: 300, // Add explicit max width
    minWidth: 200, // Add explicit min width
    color: "black",
    borderRadius: 6,
    width: "70%",
    padding: 16,
  },
  backButton: {
    backgroundColor: "#64748B",
  },
  deleteButton: {
    backgroundColor: "#961111",
  },
});

export default ExpenseModalForm;
