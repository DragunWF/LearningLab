import React, { useEffect } from "react";
import { MLCEngine } from "@react-native-ai/mlc";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ChatScreen from "./screens/ChatScreen";

export default function App() {
  useEffect(() => {
    async function fetchModels() {
      try {
        console.log("Fetching available AI models...");
        const models = await MLCEngine.getModels();
        console.log("Available models:", JSON.stringify(models, null, 2));
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    }
    fetchModels();
  }, []);

  return (
    <View style={styles.container}>
      <ChatScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
