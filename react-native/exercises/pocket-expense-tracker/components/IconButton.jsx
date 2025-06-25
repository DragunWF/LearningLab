import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ name, color, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed]}
    >
      <Ionicons name={name} size={24} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.6,
  },
});

export default IconButton;
