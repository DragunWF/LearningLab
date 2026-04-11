import { Platform } from "react-native";
import { Message } from "../types/chat";

/**
 * Local AI Chatbot Integration via web server API.
 *
 * IMPORTANT: Input the name of your local AI model here (e.g., "llama3", "mistral", "phi3").
 */
const AI_MODEL_NAME = "qwen2.5:0.5b";

/**
 * Configure your local API URL.
 * Android Emulator uses 'http://10.0.2.2:11434/api/chat'
 * iOS Simulator uses 'http://localhost:11434/api/chat'
 * For physical devices, you will need to replace this with your computer's local IP address (e.g., 'http://192.168.1.5:11434/api/chat').
 */
const LOCAL_SERVER_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:11434/api/chat"
    : "http://localhost:11434/api/chat";

export async function generateAIResponse(history: Message[]): Promise<string> {
  // Convert our chat history to Ollama's expected API format
  const mappedMessages = history.map((msg) => ({
    role: msg.sender === "ai" ? "assistant" : "user",
    content: msg.text,
  }));

  try {
    const response = await fetch(LOCAL_SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AI_MODEL_NAME,
        messages: mappedMessages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.message.content;
  } catch (error) {
    console.error("Failed to connect to local AI service:", error);
    return "Error: Could not connect to the local AI. Please ensure your local server is running, the IP address is correct, and the model name is valid.";
  }
}
