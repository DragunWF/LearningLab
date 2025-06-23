import { StyleSheet, View, Text } from "react-native";

import Card from "./Card";

function ExpenseSummaryCard({ subHeaderText, totalText }) {
  return (
    <View style={styles.container}>
      <Card style={styles.cardContainer}>
        <Text style={styles.text}>{subHeaderText}</Text>
        <Text style={styles.text}>{totalText}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 3,
    borderColor: "white",
    width: "90%",
    paddingVertical: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 10,
    width: "80%",
  },
  text: {
    color: "white",
  },
});

export default ExpenseSummaryCard;
