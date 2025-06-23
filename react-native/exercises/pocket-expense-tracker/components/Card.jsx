import { StyleSheet, View, Text } from "react-native";

function Card({ children, style }) {
  return <View style={[styles.cardContainer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "75%",
    backgroundColor: "#021526",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    elevation: 4,
    shadowColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default Card;
