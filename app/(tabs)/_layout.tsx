import React from "react";
import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { SafeAreaView, Platform, View, StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

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
    <View style={{ flex: 1 }}>
      <BlurView
        tint="light"
        intensity={Platform.OS === "ios" ? 80 : 120}
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: "rgba(255,255,255,0.3)",
        }}
      />
      <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#000000",
            tabBarInactiveTintColor: "#6B7280",
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
              marginBottom: Platform.OS === "ios" ? 2 : 6,
            },
            tabBarStyle: {
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              height: 70,
              borderRadius: 24,
              borderTopWidth: 0,
              overflow: "hidden",
              backgroundColor: "rgba(255,255,255,0.85)",
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 6,
              paddingTop: 10,
            },
            tabBarBackground: () => (
              <BlurView
                tint="light"
                intensity={Platform.OS === "ios" ? 50 : 90}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
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
              title: "Settings",
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "settings" : "settings-outline"}
                  size={26}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </View>
    </View>
  );
}
