import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  checkModelExists,
  deleteModel,
  downloadModel,
  generateCompletion,
  initializeLlama,
  MODEL_NAME,
  releaseLlama,
} from "../services/llama";

export default function HomeScreen() {
  const [modelExists, setModelExists] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const [isInitializing, setIsInitializing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [engineReady, setEngineReady] = useState(false);

  // Chat State
  const [prompt, setPrompt] = useState(
    "Why is the sky blue? Answer in one short sentence.",
  );
  const [response, setResponse] = useState("");
  const [errorMesssage, setErrorMessage] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Initial check
    checkExisting();

    // Cleanup on unmount
    return () => {
      releaseLlama();
    };
  }, []);

  const checkExisting = async () => {
    const exists = await checkModelExists();
    setModelExists(exists);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setErrorMessage(null);
    try {
      await downloadModel((progress) => setDownloadProgress(progress));
      setModelExists(true);
    } catch (e: any) {
      setErrorMessage(`Failed to download: ${e.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    await releaseLlama();
    setEngineReady(false);
    await deleteModel();
    setModelExists(false);
    setDownloadProgress(0);
  };

  const handleInitialize = async () => {
    setIsInitializing(true);
    setErrorMessage(null);
    try {
      await initializeLlama();
      setEngineReady(true);
    } catch (e: any) {
      setErrorMessage(`Failed to initialize Llama Engine:\n${e.message}`);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    // Clear the previous response before we start streaming
    setResponse("");
    setErrorMessage(null);

    try {
      await generateCompletion(prompt, (token) => {
        // Stream the token!
        setResponse((prev) => prev + token);
      });
    } catch (e: any) {
      setErrorMessage(`Generation Error: ${e.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // UI rendering helper for model management
  const renderDashboard = () => (
    <View style={styles.dashboardContainer}>
      <Text style={styles.dashboardTitle}>Engine Dashboard</Text>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Target Model</Text>
        <Text style={styles.infoText}>{MODEL_NAME}</Text>
        <Text style={styles.infoSubtitle}>(~800MB download)</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Hardware Info</Text>
        <Text style={styles.infoText}>Platform: {Platform.OS}</Text>
        <Text style={styles.infoSubtitle}>
          GPU Acceleration configured:{" "}
          {Platform.OS === "ios" ? "Metal" : "OpenCL"}
        </Text>
      </View>

      {isDownloading ? (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Downloading: {(downloadProgress * 100).toFixed(1)}%
          </Text>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${downloadProgress * 100}%` },
              ]}
            />
          </View>
        </View>
      ) : !modelExists ? (
        <TouchableOpacity style={styles.primaryButton} onPress={handleDownload}>
          <Text style={styles.buttonText}>Download Model</Text>
        </TouchableOpacity>
      ) : !engineReady ? (
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.primaryButton, { flex: 1, marginRight: 12 }]}
            onPress={handleInitialize}
          >
            {isInitializing ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Load AI Engine</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.dangerButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.readyCard}>
          <Text style={styles.readyText}>✅ AI Engine Loaded into Memory</Text>
          <TouchableOpacity
            style={[styles.dangerButton, { marginTop: 12 }]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Unload & Delete Model</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          <Text style={styles.appTitle}>On-Device AI</Text>

          {renderDashboard()}

          {errorMesssage && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMesssage}</Text>
            </View>
          )}

          {engineReady && (
            <View style={styles.chatContainer}>
              <Text style={styles.chatTitle}>Test the AI</Text>

              <TextInput
                style={styles.chatInput}
                value={prompt}
                onChangeText={setPrompt}
                placeholder="Message the AI..."
                placeholderTextColor="#999"
                multiline
              />

              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  isGenerating && styles.buttonDisabled,
                ]}
                onPress={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Generate Response</Text>
                )}
              </TouchableOpacity>

              {response ? (
                <View style={styles.responseContainer}>
                  <Text style={styles.responseText}>{response}</Text>
                  {isGenerating && <Text style={styles.typingCursor}>▋</Text>}
                </View>
              ) : null}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 24,
    textAlign: "center",
    color: "#111",
    letterSpacing: 0.5,
  },
  dashboardContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  infoCard: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  infoTitle: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },
  infoSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  progressContainer: {
    marginTop: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#007AFF",
    textAlign: "center",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "#e9ecef",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#007AFF",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 52,
  },
  dangerButton: {
    backgroundColor: "#ff3b30",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "#99c6f5",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  readyCard: {
    marginTop: 8,
    padding: 16,
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    alignItems: "center",
  },
  readyText: {
    color: "#2e7d32",
    fontWeight: "600",
    fontSize: 16,
  },
  errorContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "#ffebee",
    borderWidth: 1,
    borderColor: "#ffcdd2",
    borderRadius: 12,
    marginBottom: 24,
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  chatContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  chatInput: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 16,
    paddingTop: 16, // iOS multiline fix
    minHeight: 100,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginBottom: 16,
    textAlignVertical: "top",
  },
  responseContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  responseText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#111",
  },
  typingCursor: {
    fontSize: 15,
    color: "#007AFF",
    marginTop: 4,
  },
});
