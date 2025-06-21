import { StyleSheet, View, Text } from "react-native";

function MealItem({ title }) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default MealItem;
