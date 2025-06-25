import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import Card from "./Card";
import PrimaryButton from "./PrimaryButton";
import { formatNumber } from "../helpers/utils";
import { ExpensesContext } from "../store/ExpensesContext";

function ExpenseCard({ id, name, date, expense }) {
  const expensesContext = useContext(ExpensesContext);

  function openEditExpenseForm() {
    expensesContext.openEditExpenseForm(id);
  }

  return (
    <Card style={styles.cardContainer}>
      <View style={styles.cardInfoContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      <PrimaryButton onPress={openEditExpenseForm}>
        ₱ {formatNumber(expense)}
      </PrimaryButton>
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: 325,
  },
  cardInfoContainer: {
    gap: 3,
  },
  text: {
    color: "white",
  },
});

export default ExpenseCard;
