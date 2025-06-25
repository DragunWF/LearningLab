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

export function isCurrentWeek(date) {
  const inputDate = new Date(date);
  const today = new Date();

  // Get the start of this week (Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  // Get the end of this week (Saturday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Check if the input date falls within this week
  return inputDate >= startOfWeek && inputDate <= endOfWeek;
}

export function getSortedExpensesByDate(expenses) {
  return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getDateToday() {
  return new Date().toISOString().split("T")[0];
}
