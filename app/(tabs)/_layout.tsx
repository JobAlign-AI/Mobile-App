import React from "react";
import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Platform, View, StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading while checking authentication
  if (!isLoaded) {
    return null;
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#666666",
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
            marginBottom: Platform.OS === "ios" ? 2 : 6,
            letterSpacing: 0.5,
          },
          tabBarStyle: {
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            height: 75,
            borderRadius: 20,
            borderTopWidth: 0,
            overflow: "hidden",
            backgroundColor: "rgba(26, 26, 26, 0.95)",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.1)",
            paddingTop: 10,
            paddingBottom: Platform.OS === "ios" ? 20 : 10,
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={["rgba(26, 26, 26, 0.98)", "rgba(20, 20, 20, 0.98)"]}
              style={{ flex: 1 }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={26}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={26}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="email"
          options={{
            title: "Email",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "mail" : "mail-outline"}
                size={26}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={26}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
