import { StyleSheet, View, Text, Button } from "react-native";
import { launchCameraAsync } from "expo-image-picker";

function ImagePicker() {
  async function takeImageHandler() {
    const chosenImage = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(chosenImage);
  }

  return (
    <View>
      <Button title="Take image" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ImagePicker;
