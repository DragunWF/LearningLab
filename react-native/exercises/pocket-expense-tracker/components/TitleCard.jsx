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
    backgroundColor: "#021526",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    maxWidth: 300,
    elevation: 4,
    shadowColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
  },
  text: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    color: "white",
  },
});

export default ExpenseSummaryCard;
