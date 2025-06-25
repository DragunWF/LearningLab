import { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Modal, TextInput, Alert } from "react-native";

import PrimaryButton from "./PrimaryButton";
import IconButton from "./IconButton";
import { ExpensesContext } from "../store/ExpensesContext";

function ExpenseModalForm({ isVisible }) {
  const expensesContext = useContext(ExpensesContext);
  const editingExpenseId = expensesContext.editingExpenseId;
  const isEditForm = editingExpenseId !== null;

  const currentExpense = expensesContext.expenses.find(
    (expense) => expense.id === editingExpenseId
  );

  const [expenseName, setExpenseName] = useState("");
  const [moneySpent, setMoneySpent] = useState("");

  // Update state when expense data changes
  useEffect(() => {
    if (isEditForm && currentExpense) {
      setExpenseName(currentExpense.name || "");
      setMoneySpent(currentExpense.expense?.toString() || "");
    } else {
      // Reset form for new expense
      setExpenseName("");
      setMoneySpent("");
    }
  }, [isEditForm, currentExpense]);

  function expenseNameInputHandler(enteredName) {
    setExpenseName(enteredName);
  }

  function moneySpentInputHandler(enteredMoney) {
    setMoneySpent(enteredMoney);
  }

  function deleteExpense() {
    expensesContext.deleteExpense(editingExpenseId);
    expensesContext.closeExpenseForm();
  }

  function onSubmit() {
    if (!isFormInputsValid()) {
      return;
    }

    if (isEditForm) {
      expensesContext.updateExpense(currentExpense);
    } else {
      expensesContext.addExpense(expenseName, Number(moneySpent));
    }

    expensesContext.closeExpenseForm();
  }

  function isFormInputsValid() {
    if (!expenseName) {
      alert(
        "Empty Expense Name!",
        "Please make sure you enter your expense name!"
      );
      return false;
    }
    if (!moneySpent.length) {
      alert(
        "Empty Field on Money Spent!",
        "Please make sure you enter the amount of money you have spent on this expense!"
      );
      return false;
    }
    if (moneySpent <= 0) {
      alert(
        "Invalid Money Amount!",
        "The inputted money spent cannot be zero or negative!"
      );
      return false;
    }
    try {
      Number(moneySpent);
    } catch (err) {
      alert(
        "Invalid Money Input!",
        "Make sure the inputted value is a valid number!"
      );
    }
    return true;
  }

  function alert(title, message) {
    Alert.alert(title, message, [
      {
        text: "Okay",
        style: "cancel",
      },
    ]);
  }

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.rootContainer}>
        <IconButton
          name="arrow-back"
          color="white"
          style={styles.topLeftBackButton}
          onPress={expensesContext.closeExpenseForm}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Expense Form</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Expense Name"
            value={expenseName}
            onChangeText={expenseNameInputHandler}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Money Spent"
            value={moneySpent}
            onChangeText={moneySpentInputHandler}
            keyboardType="decimal-pad"
          />
          <View style={styles.buttonsContainer}>
            {isEditForm && (
              <PrimaryButton
                style={styles.deleteButton}
                onPress={deleteExpense}
              >
                Delete
              </PrimaryButton>
            )}
            <PrimaryButton onPress={onSubmit}>
              {isEditForm ? "Confirm Edit" : "Add New Expense"}
            </PrimaryButton>
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
  topLeftBackButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
    padding: 10,
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
    maxWidth: 300,
    minWidth: 200,
    color: "black",
    borderRadius: 6,
    width: "70%",
    padding: 16,
  },
  deleteButton: {
    backgroundColor: "#961111",
  },
});

export default ExpenseModalForm;
