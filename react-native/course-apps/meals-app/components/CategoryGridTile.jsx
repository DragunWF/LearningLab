import { Pressable, StyleSheet, View, Text } from "react-native";

function CategoryGridTile({ title, color, onPress }) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <View>
          <Text>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});

export default CategoryGridTile;
