import { StyleSheet, View, Text, Pressable } from "react-native";

function PrimaryButton({ children, style, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={[styles.buttonContainer, style]}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#03346E",
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "white",
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    color: "white",
  },
});

export default PrimaryButton;
