import { createContext, useState } from "react";

import ExpenseModalForm from "../components/ExpenseModalForm";
import { EXPENSES } from "../helpers/dummyData";

export const ExpensesContext = createContext({
  expenses: [...EXPENSES],
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

  function addExpense(expense) {
    setExpenses((current) => [...current, expense]);
  }

  function deleteExpense(targetId) {
    setExpenses((current) =>
      current.filter((expense) => expense.id !== targetId)
    );
  }

  function updateExpense(updatedExpense) {
    const currentExpenses = [...expenses];
    for (let i = 0; i < currentExpenses.length; i++) {
      const expense = currentExpenses[i];
      if (expense.id === updatedExpense.id) {
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
