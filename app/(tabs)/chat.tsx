import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI Career Assistant. How can I help you with your career today?",
      sender: "ai",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      text: "Hi! I'd like to know more about improving my CV for tech roles.",
      sender: "user",
      timestamp: "10:32 AM",
    },
    {
      id: "3",
      text: "Great! I'd be happy to help you improve your CV. Here are some key areas to focus on:\n\n• Technical skills section\n• Project experience\n• Quantifiable achievements\n• Clean, modern formatting\n\nWould you like me to elaborate on any of these points?",
      sender: "ai",
      timestamp: "10:35 AM",
    },
    {
      id: "4",
      text: "Yes, tell me more about the technical skills section.",
      sender: "user",
      timestamp: "10:37 AM",
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage("");

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your question! Let me help you with that...",
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user"
          ? styles.userMessageContainer
          : styles.aiMessageContainer,
      ]}
    >
      {item.sender === "ai" && (
        <View style={styles.aiAvatar}>
          <Ionicons name="sparkles" size={16} color="#FFFFFF" />
        </View>
      )}

      <View
        style={[
          styles.messageBubble,
          item.sender === "user" ? styles.userBubble : styles.aiBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender === "user" ? styles.userText : styles.aiText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            item.sender === "user" ? styles.userTimestamp : styles.aiTimestamp,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>

      {item.sender === "user" && (
        <View style={styles.userAvatar}>
          <Ionicons name="person" size={16} color="#FFFFFF" />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Chat Header */}
      <LinearGradient colors={["#0A0A0A", "#1A1A1A"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.aiHeaderAvatar}>
            <Ionicons name="sparkles" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Chat With the CV</Text>
            <View style={styles.statusContainer}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.statusText}>Always available</Text>
            </View>
          </View>
          <Pressable style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
          </Pressable>
        </View>
      </LinearGradient>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        inverted={false}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <LinearGradient
          colors={["#1F2937", "#111827"]}
          style={styles.inputGradient}
        >
          <View style={styles.inputWrapper}>
            <View style={styles.textInputContainer}>
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Ask me anything about your career..."
                placeholderTextColor="#6B7280"
                style={styles.textInput}
                multiline
                maxLength={500}
              />
            </View>

            <Pressable
              onPress={sendMessage}
              style={[
                styles.sendButton,
                message.trim()
                  ? styles.sendButtonActive
                  : styles.sendButtonInactive,
              ]}
            >
              <LinearGradient
                colors={
                  message.trim()
                    ? ["#FFFFFF", "#E0E0E0"]
                    : ["#374151", "#374151"]
                }
                style={styles.sendButtonGradient}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={message.trim() ? "#000000" : "#9CA3AF"}
                />
              </LinearGradient>
            </Pressable>
          </View>

          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsLabel}>Quick questions:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.suggestionsWrapper}>
                {[
                  "CV Tips",
                  "Interview Prep",
                  "Salary Guide",
                  "Career Change",
                ].map((suggestion) => (
                  <Pressable
                    key={suggestion}
                    style={styles.suggestionChip}
                    onPress={() => setMessage(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  header: {
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  aiHeaderAvatar: {
    width: 36,
    height: 36,
    backgroundColor: "#374151",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  moreButton: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#374151",
  },
  messagesList: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },
  messagesContent: {
    padding: 12,
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-end",
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
  aiMessageContainer: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: "#FFFFFF",
    borderBottomRightRadius: 6,
    marginLeft: 40,
  },
  aiBubble: {
    backgroundColor: "#1F2937",
    borderBottomLeftRadius: 6,
    marginRight: 40,
    borderWidth: 1,
    borderColor: "#374151",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: "#000000",
  },
  aiText: {
    color: "#F3F4F6",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: "500",
  },
  userTimestamp: {
    color: "#999999",
    textAlign: "right",
  },
  aiTimestamp: {
    color: "#9CA3AF",
  },
  aiAvatar: {
    width: 32,
    height: 32,
    backgroundColor: "#374151",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userAvatar: {
    width: 32,
    height: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  inputContainer: {
    backgroundColor: "transparent",
  },
  inputGradient: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: "#374151",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  textInput: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlignVertical: "center",
    maxHeight: 96,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sendButtonActive: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  sendButtonInactive: {},
  sendButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestionsLabel: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 8,
    fontWeight: "500",
  },
  suggestionsWrapper: {
    flexDirection: "row",
    gap: 8,
  },
  suggestionChip: {
    backgroundColor: "#374151",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4B5563",
  },
  suggestionText: {
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "500",
  },
});
