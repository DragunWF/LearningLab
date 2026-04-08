import * as FileSystem from 'expo-file-system';
import { initLlama, LlamaContext } from 'llama.rn';

export const MODEL_NAME = 'Llama-3.2-1B-Instruct-Q4_K_M.gguf';

// HuggingFace direct download URL for the quantized Llama 3.2 1B model
export const MODEL_URL = 'https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF/resolve/main/Llama-3.2-1B-Instruct-Q4_K_M.gguf';

// Singleton instance to prevent OOM errors by loading multiple contexts
let globalLlamaContext: LlamaContext | null = null;

export const getModelPath = () => {
  return `${FileSystem.documentDirectory}${MODEL_NAME}`;
};

export const checkModelExists = async (): Promise<boolean> => {
  const path = getModelPath();
  const info = await FileSystem.getInfoAsync(path);
  return info.exists;
};

export const deleteModel = async (): Promise<void> => {
  const path = getModelPath();
  await FileSystem.deleteAsync(path, { idempotent: true });
};

export const downloadModel = async (
  onProgress: (progress: number) => void
): Promise<string> => {
  const path = getModelPath();
  
  const downloadResumable = FileSystem.createDownloadResumable(
    MODEL_URL,
    path,
    {},
    (downloadProgress) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      onProgress(progress);
    }
  );

  try {
    const result = await downloadResumable.downloadAsync();
    if (!result) {
      throw new Error('Download failed');
    }
    return result.uri;
  } catch (error) {
    console.error('Error downloading model:', error);
    throw error;
  }
};

export const initializeLlama = async (): Promise<LlamaContext> => {
  if (globalLlamaContext) {
    return globalLlamaContext;
  }

  const path = getModelPath();
  const exists = await checkModelExists();
  if (!exists) {
    throw new Error('Model file not found. Please download it first.');
  }

  try {
    // Keep context window small to preserve phone RAM
    globalLlamaContext = await initLlama({
      model: path,
      use_mlock: true, 
      n_ctx: 512, 
    });
    return globalLlamaContext;
  } catch (error) {
    console.error('Failed to initialize Llama context:', error);
    throw error;
  }
};

export const releaseLlama = async (): Promise<void> => {
  if (globalLlamaContext) {
    globalLlamaContext.release();
    globalLlamaContext = null;
  }
};

export const generateCompletion = (
  prompt: string,
  onToken: (token: string) => void
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    if (!globalLlamaContext) {
      reject(new Error('Llama context not initialized'));
      return;
    }

    // Add prompt formatting for Llama 3 Instruct 
    const formattedPrompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful AI assistant.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n${prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`;

    try {
      const result = await globalLlamaContext.completion(
        {
          prompt: formattedPrompt,
          n_predict: 250, 
          temperature: 0.7,
        },
        (data) => {
          onToken(data.token);
        }
      );
      resolve(result.text);
    } catch (error) {
      reject(error);
    }
  });
};
