import { createContext, useState } from "react";

export const ExpensesContext = createContext({
  ids: [],
  addExpense: (id) => {},
  deleteExpense: (id) => {},
  updateExpense: (id) => {},
});

function ExpensesContextProvider({ children }) {
  const [expenseIds, setExpenseIds] = useState([]);

  function addExpense(id) {}

  function deleteExpense(id) {}

  function updateExpense(id) {}

  const value = {
    ids: expenseIds,
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
