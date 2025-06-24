import { createContext, useState } from "react";

import { EXPENSES } from "../helpers/dummyData";

export const ExpensesContext = createContext({
  expenses: [...EXPENSES],
  addExpense: (id) => {},
  deleteExpense: (id) => {},
  updateExpense: (id) => {},
});

function ExpensesContextProvider({ children }) {
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

  const value = {
    expenses: expenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
