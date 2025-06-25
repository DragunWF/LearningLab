import { useContext } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

import Card from "./Card";
import { formatNumber } from "../helpers/utils";
import { ExpensesContext } from "../store/ExpensesContext";

function ExpenseCard({ name, date, expense }) {
  const expensesContext = useContext(ExpensesContext);

  return (
    <Card style={styles.cardContainer}>
      <View style={styles.cardInfoContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={expensesContext.openExpenseForm}>
          <View>
            <Text style={styles.text}>₱ {formatNumber(expense)}</Text>
          </View>
        </Pressable>
      </View>
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
  buttonContainer: {
    justifyContent: "center",
    backgroundColor: "#03346E",
    borderRadius: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  text: {
    color: "white",
  },
});

export default ExpenseCard;
