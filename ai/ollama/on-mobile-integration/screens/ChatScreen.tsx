import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { Message } from '../types/chat';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am ready to answer your questions once my AI is integrated.',
      sender: 'ai',
      timestamp: Date.now(),
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsAiLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'This is a simulated AI response. The actual AI is not yet integrated.',
        sender: 'ai',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, newAiMessage]);
      setIsAiLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListFooterComponent={
            isAiLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#007AFF" />
                <Text style={styles.loadingText}>AI is typing...</Text>
              </View>
            ) : null
          }
        />
        <ChatInput onSend={handleSend} isSending={isAiLoading} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexGrow: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
});
