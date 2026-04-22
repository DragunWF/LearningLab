import { mlc, MLCEngine } from "@react-native-ai/mlc";
import { generateText } from "ai";
import { Message } from "../types/chat";

/**
 * Identify the MLC compiled model to use.
 * Note: MLC uses differently compiled models from GGUF. You must use a pre-compiled
 * model available via the MLC ecosystem.
 */
const MLC_MODEL_NAME = "Qwen2-1.5B-Instruct";

// Hold the active model binding
let mlcModel: ReturnType<typeof mlc.languageModel> | null = null;

export type DownloadProgressCallback = (progress: number) => void;

/**
 * Initializes the MLC Model.
 * Handles the download phase automatically.
 */
export async function initMLC(
  onProgress?: DownloadProgressCallback,
): Promise<void> {
  if (mlcModel) {
    return; // Already initialized
  }

  try {
    console.log("Initializing MLC engine...");
    // Create the language model instance via the Vercel AI SDK interface
    mlcModel = mlc.languageModel(MLC_MODEL_NAME);

    console.log(`Downloading and preparing ${MLC_MODEL_NAME}...`);

    // Begin download
    if (onProgress) onProgress(0);
    // Note: The Vercel AI SDK wrapper might not expose granular progress hooks yet,
    // so we step through the major lifecycle phases instead.

    // Download weights into local storage
    if (mlcModel.download) {
      await mlcModel.download();
    }

    if (onProgress) onProgress(0.5);

    // Load weights into GPU memory via TVM
    if (mlcModel.prepare) {
      await mlcModel.prepare();
    }

    if (onProgress) onProgress(1); // Complete
    console.log("MLC engine successfully initialized and ready!");
  } catch (error) {
    console.error("Failed to initialize local MLC LLM:", error);
    mlcModel = null;
    throw error;
  }
}

/**
 * Generates an AI response using the on-device MLC model and Vercel AI SDK framework.
 */
export async function generateLocalResponse(
  history: Message[],
): Promise<string> {
  if (!mlcModel) {
    throw new Error("MLC Model is not initialized. Please call initMLC first.");
  }

  // Convert our custom Message format to strict Vercel AI SDK format
  const mappedMessages = history.map((msg) => ({
    role: msg.sender === "ai" ? "assistant" : "user",
    content: msg.text,
  }));

  try {
    const { text } = await generateText({
      model: mlcModel,
      messages: mappedMessages as any, // Cast to CoreMessage[] format
    });

    return text;
  } catch (error) {
    console.error("MLC Inference failed: ", error);
    throw error;
  }
}
