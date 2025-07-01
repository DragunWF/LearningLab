import axios from "axios";
import Constants from "expo-constants";

const databaseUrl = Constants.expoConfig?.extra?.databaseUrl;

export function storeExpense(expenseData) {
  axios.post(`${databaseUrl}/expenses.json`, expenseData);
}

export async function fetchExpenses() {
  const response = await axios.get(`${databaseUrl}`);

  const expenses = [];
  console.log(response.data);

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    console.log(expenseObj);
    expenses.push(expenseObj);
  }

  return expenses;
}
