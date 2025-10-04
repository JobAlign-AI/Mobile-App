import { Text, View } from "react-native";
import Button from "../components/Button";

export default function Index() {
  const handleButtonPress = () => {
    console.log("Button pressed!");
  };

  return (
    <View className="flex-1 justify-center items-center bg-blue-50 px-6">
      <Text className="text-3xl font-bold text-blue-800 mb-2">
        Welcome to Mobile App
      </Text>
      <Text className="text-lg text-gray-600 text-center mb-8">
        Edit app/index.tsx to edit this screen.
      </Text>

      <View className="w-full max-w-sm space-y-4">
        <View className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Tailwind CSS is working! 🎉
          </Text>
          <Text className="text-gray-600 mb-4">
            You can now use Tailwind classes in your React Native components.
          </Text>

          <View className="space-y-3">
            <Button
              title="Primary Button"
              onPress={handleButtonPress}
              variant="primary"
            />
            <Button
              title="Secondary Button"
              onPress={handleButtonPress}
              variant="secondary"
            />
            <Button
              title="Danger Button"
              onPress={handleButtonPress}
              variant="danger"
            />
          </View>
        </View>
      </View>
    </View>
  );
}
