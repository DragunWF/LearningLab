import { createContext, useState } from "react";

import { EXPENSES } from "../data/dummyData";

export const ExpensesContext = createContext({
  expenses: [...EXPENSES],
  addExpense: (id) => {},
  deleteExpense: (id) => {},
  updateExpense: (id) => {},
});

function ExpensesContextProvider({ children }) {
  const [expenses, setExpense] = useState([...EXPENSES]);

  function addExpense(id) {}

  function deleteExpense(id) {}

  function updateExpense(id) {}

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
