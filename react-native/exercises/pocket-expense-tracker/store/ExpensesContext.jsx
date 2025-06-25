import { createContext, useState } from "react";

import ExpenseModalForm from "../components/ExpenseModalForm";
import { EXPENSES } from "../helpers/dummyData";
import { getDateToday } from "../helpers/utils";
import Expense from "../models/expense";

export const ExpensesContext = createContext({
  expenses: [...EXPENSES],
  generateExpenseId: () => {},
  openAddExpenseForm: () => {},
  openEditExpenseForm: (expenseId) => {},
  editingExpenseId: null,
  closeExpenseForm: () => {},
  addExpense: (expense) => {},
  deleteExpense: (targetId) => {},
  updateExpense: (updatedExpense) => {},
});

function ExpensesContextProvider({ children }) {
  const [isExpenseModalFormOpen, setIsExpenseModalFormOpen] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [expenses, setExpenses] = useState([...EXPENSES]);

  function generateExpenseId() {
    let maxId = expenses[0];
    for (let expense of expenses) {
      if (expense.id > maxId) {
        maxId = expense.id;
      }
    }
    return maxId + 1;
  }

  function addExpense(expenseName, expenseAmount) {
    setExpenses((current) => [
      ...current,
      new Expense(
        generateExpenseId(),
        expenseName,
        expenseAmount,
        getDateToday()
      ),
    ]);
  }

  function deleteExpense(targetId) {
    setExpenses((current) =>
      current.filter((expense) => expense.id !== targetId)
    );
  }

  function updateExpense(targetId, updatedName, updatedExpenseAmount) {
    const currentExpenses = [...expenses];
    for (let i = 0; i < currentExpenses.length; i++) {
      const expense = currentExpenses[i];
      if (expense.id === targetId) {
        const updatedExpense = {
          ...expense,
          name: updatedName,
          expense: updatedExpenseAmount,
        };
        currentExpenses[i] = updatedExpense;
        break;
      }
    }
    setExpenses(currentExpenses);
  }

  function openAddExpenseForm() {
    setEditingExpenseId(null);
    setIsExpenseModalFormOpen(true);
  }

  function openEditExpenseForm(expenseId) {
    setEditingExpenseId(expenseId);
    setIsExpenseModalFormOpen(true);
  }

  function closeExpenseForm() {
    setEditingExpenseId(null);
    setIsExpenseModalFormOpen(false);
  }

  const value = {
    expenses: expenses,
    generateExpenseId: generateExpenseId,
    openAddExpenseForm: openAddExpenseForm,
    openEditExpenseForm: openEditExpenseForm,
    editingExpenseId: editingExpenseId,
    closeExpenseForm: closeExpenseForm,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      <ExpenseModalForm isVisible={isExpenseModalFormOpen} />
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
