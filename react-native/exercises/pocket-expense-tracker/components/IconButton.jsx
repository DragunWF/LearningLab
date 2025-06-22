import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ name, color, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={[style, ({ pressed }) => (pressed ? styles.pressed : null)]}
    >
      <Ionicons name={name} size={24} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.25,
  },
});

export default IconButton;
