import { Platform } from "react-native";
import { Message } from "../types/chat";
import { generateLocalResponse } from "./mlcService";

/**
 * Configuration toggle to switch between local web server inference (via Ollama API)
 * and full on-device inference (via MLC).
 * Set this to true when you want to test the app entirely offline.
 */
export const USE_ON_DEVICE_AI = true;

/**
 * Local AI Chatbot Integration via web server API.
 *
 * IMPORTANT: Input the name of your local AI model here.
 */
const AI_MODEL_NAME = "qwen2.5:0.5b";

/**
 * Configure your local API URL.
 */
const LOCAL_SERVER_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:11434/api/chat"
    : "http://localhost:11434/api/chat";

async function generateWebAPIResponse(history: Message[]): Promise<string> {
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
    return "Error: Could not connect to the local web API AI. Please ensure your local server is running.";
  }
}

/**
 * Unified logic to route to whichever AI engine is currently enabled.
 */
export async function generateAIResponse(history: Message[]): Promise<string> {
  if (USE_ON_DEVICE_AI) {
    try {
      return await generateLocalResponse(history);
    } catch (e) {
      return "On-Device Error: Failed to generate response from MLC context.";
    }
  } else {
    return await generateWebAPIResponse(history);
  }
}
