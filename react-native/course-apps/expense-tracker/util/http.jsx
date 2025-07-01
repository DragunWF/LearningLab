import axios from "axios";
import Constants from "expo-constants";

const databaseUrl = Constants.expoConfig?.extra?.databaseUrl;

export function storeExpense(expenseData) {
  axios.post(`${databaseUrl}/expenses.json`, expenseData);
}
