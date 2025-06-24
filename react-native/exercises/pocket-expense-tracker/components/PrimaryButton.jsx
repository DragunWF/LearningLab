import { StyleSheet, View, Text, Pressable } from "react-native";

function PrimaryButton({ onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View>
        <Text>PrimaryButton</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({});

export default PrimaryButton;
