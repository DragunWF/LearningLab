import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface Props {
  onSend: (text: string) => void;
  isSending?: boolean;
}

export default function ChatInput({ onSend, isSending = false }: Props) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length > 0 && !isSending) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={text}
        onChangeText={setText}
        multiline
        maxLength={500}
        editable={!isSending}
      />
      <TouchableOpacity 
        style={[styles.sendButton, (!text.trim() || isSending) && styles.sendButtonDisabled]} 
        onPress={handleSend}
        disabled={!text.trim() || isSending}
      >
        {isSending ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.sendText}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e5e5ea',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: '#f2f2f7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#A1C6EA',
  },
  sendText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
