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
        return "bg-white active:bg-gray-200";
      case "secondary":
        return "bg-zinc-800 active:bg-zinc-700";
      case "danger":
        return "bg-red-600 active:bg-red-700";
      default:
        return "bg-white active:bg-gray-200";
    }
  };

  const getTextClasses = () => {
    switch (variant) {
      case "primary":
        return "text-black";
      case "secondary":
        return "text-white";
      case "danger":
        return "text-white";
      default:
        return "text-black";
    }
  };

  return (
    <Pressable
      onPress={onPress}
      className={`px-4 py-3 rounded-lg ${getVariantClasses()}`}
    >
      <Text
        className={`font-bold text-center text-sm tracking-wider ${getTextClasses()}`}
      >
        {title.toUpperCase()}
      </Text>
    </Pressable>
  );
}
