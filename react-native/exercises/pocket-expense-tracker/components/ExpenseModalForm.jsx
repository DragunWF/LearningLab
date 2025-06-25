import { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Modal, TextInput, Alert } from "react-native";
import Toast from "react-native-toast-message";

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
    if (isVisible) {
      if (isEditForm && currentExpense) {
        setExpenseName(currentExpense.name || "");
        setMoneySpent(currentExpense.expense?.toString() || "");
      } else {
        // Reset form for new expense
        resetFormHandler();
      }
    }
  }, [isEditForm, currentExpense, isVisible]);

  function expenseNameInputHandler(enteredName) {
    setExpenseName(enteredName);
  }

  function moneySpentInputHandler(enteredMoney) {
    setMoneySpent(enteredMoney);
  }

  function resetFormHandler() {
    setExpenseName("");
    setMoneySpent("");
  }

  function deleteExpenseHandler() {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            expensesContext.deleteExpense(editingExpenseId);
            expensesContext.closeExpenseForm();
          },
        },
      ]
    );
  }

  function submitFormHandler() {
    if (!isFormInputsValid()) {
      return;
    }

    Alert.alert(
      "Confirm Action",
      isEditForm
        ? "Are you sure you want to edit this expense?"
        : "Are you sure you want to add this expense?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            if (isEditForm) {
              expensesContext.updateExpense(
                editingExpenseId,
                expenseName,
                Number(moneySpent)
              );
              Toast.show({
                type: "success",
                text1: "Expense Updated",
                text2: `${expenseName} has been updated!`,
              });
            } else {
              expensesContext.addExpense(expenseName, Number(moneySpent));
              Toast.show({
                type: "success",
                text1: "New Expense Added",
                text2: `${expenseName} has been added to the list!`,
              });
            }
            expensesContext.closeExpenseForm();
          },
        },
      ]
    );
  }

  function isFormInputsValid() {
    if (!expenseName) {
      validationAlert(
        "Empty Expense Name!",
        "Please make sure you enter your expense name!"
      );
      return false;
    }
    if (!moneySpent.length) {
      validationAlert(
        "Empty Field on Money Spent!",
        "Please make sure you enter the amount of money you have spent on this expense!"
      );
      return false;
    }
    if (moneySpent <= 0) {
      validationAlert(
        "Invalid Money Amount!",
        "The inputted money spent cannot be zero or negative!"
      );
      return false;
    }
    if (isNaN(Number(moneySpent))) {
      validationAlert(
        "Invalid Money Input!",
        "Make sure the inputted value is a valid number!"
      );
      return false;
    }

    return true;
  }

  function validationAlert(title, message) {
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
            <PrimaryButton
              style={styles.resetButton}
              onPress={resetFormHandler}
            >
              Reset
            </PrimaryButton>
            {isEditForm && (
              <PrimaryButton
                style={styles.deleteButton}
                onPress={deleteExpenseHandler}
              >
                Delete
              </PrimaryButton>
            )}
            <PrimaryButton onPress={submitFormHandler}>
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
  resetButton: {
    backgroundColor: "#374151",
  },
  deleteButton: {
    backgroundColor: "#961111",
  },
});

export default ExpenseModalForm;
