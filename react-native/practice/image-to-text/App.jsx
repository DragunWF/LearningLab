import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { generateGeminiInsights } from "./helpers/insightGenerator";

export default function App() {
  // State to hold the selected image
  const [image, setImage] = useState(null);

  // State to hold extracted text
  const [extractedText, setExtractedText] = useState("");
  const [isExtractionLoading, setIsExtractionLoading] = useState(false);

  // State to hold insights
  const [insights, setInsights] = useState("");
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);

  // Function to pick an image from the
  // device's gallery
  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      // Perform OCR on the selected image
      performOCR(result.assets[0]);

      // Set the selected image in state
      setImage(result.assets[0].uri);
    }
  };

  // Function to capture an image using the
  // device's camera
  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      // Perform OCR on the captured image
      // Set the captured image in state
      const extractedText = await performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
      await generateInsights(extractedText);
    }
  };

  // Function to perform OCR on an image
  // and extract text
  const performOCR = async (file) => {
    try {
      setIsExtractionLoading(true);

      // Create FormData and append the image
      const formData = new FormData();
      formData.append("file", {
        uri: file.uri,
        type: "image/jpeg",
        name: "image.jpg",
      });

      const response = await axios.post(
        "https://api.apilayer.com/image_to_text/upload",
        formData,
        {
          headers: {
            apikey: process.env.EXPO_PUBLIC_OCR_API_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const text = response.data["all_text"];
      // Set the extracted text in state
      setExtractedText(text);
      return text; // Return the text so it can be used immediately
    } catch (error) {
      console.log("error", error);
      return ""; // Return empty string on error
    } finally {
      setIsExtractionLoading(false);
    }
  };

  const generateInsights = async (text) => {
    try {
      setIsInsightsLoading(true);
      const response = await generateGeminiInsights(text);
      setInsights(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsInsightsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Welcome!</Text>
        <Text style={styles.heading2}>Image to Text App</Text>

        <Button title="Pick an image from gallery" onPress={pickImageGallery} />
        <Button title="Pick an image from camera" onPress={pickImageCamera} />

        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 400,
              height: 300,
              objectFit: "contain",
            }}
          />
        )}

        <Text style={styles.textBold}>Extracted text:</Text>
        {isExtractionLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>{extractedText}</Text>
        )}

        <Text style={styles.textBold}>Insights:</Text>
        {isInsightsLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.text}>{insights}</Text>
        )}

        <StatusBar style="auto" />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "green",
    textAlign: "center",
  },
  heading2: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
    textAlign: "center",
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
  },
});
