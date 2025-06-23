import { StyleSheet, View, Text } from "react-native";

function ExpenseSummaryCard({ subHeaderText, totalText }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{subHeaderText}</Text>
      <Text style={styles.text}>{totalText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: "#A0C878",
    borderRadius: 10,
    maxWidth: 300,
  },
  text: {
    paddingVertical: 12,
    paddingHorizontal: 35,
  },
});

export default ExpenseSummaryCard;
