export function getTotalExpenses(expenses) {
  let totalExpenses = 0;
  for (let expense of expenses) {
    totalExpenses += expense.expense;
  }
  return totalExpenses;
}

export function formatNumber(number) {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
