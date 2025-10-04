import React from "react";
import { View, Text, Pressable } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export default function Button({
  title,
  onPress,
  variant = "primary",
}: ButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500 active:bg-blue-600";
      case "secondary":
        return "bg-gray-500 active:bg-gray-600";
      case "danger":
        return "bg-red-500 active:bg-red-600";
      default:
        return "bg-blue-500 active:bg-blue-600";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      className={`px-6 py-3 rounded-lg ${getVariantClasses()}`}
    >
      <Text className="text-white font-semibold text-center">{title}</Text>
    </Pressable>
  );
}
