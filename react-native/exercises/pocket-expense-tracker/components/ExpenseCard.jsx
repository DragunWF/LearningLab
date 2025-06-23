import { StyleSheet, View, Text, Pressable } from "react-native";

import Card from "./Card";

function ExpenseCard({ onEdit }) {
  return (
    <Card style={styles.cardContainer}>
      <View style={styles.cardInfoContainer}>
        <Text style={styles.text}>Expense Title</Text>
        <Text style={styles.text}>Date</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={onEdit}>
          <View>
            <Text style={styles.text}>₱ 0.00</Text>
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
