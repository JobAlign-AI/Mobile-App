# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) and enhanced with [Tailwind CSS](https://tailwindcss.com/) via [NativeWind](https://www.nativewind.dev/).

## Styling with Tailwind CSS

This project is configured with **NativeWind**, which allows you to use Tailwind CSS classes directly in your React Native components:

```tsx
import { View, Text } from "react-native";

export default function MyComponent() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-50">
      <Text className="text-2xl font-bold text-blue-800">Hello Tailwind!</Text>
    </View>
  );
}
```

### Available Tailwind Features

- **Layout**: `flex`, `justify-center`, `items-center`, etc.
- **Colors**: `bg-blue-500`, `text-white`, etc.
- **Typography**: `text-lg`, `font-bold`, etc.
- **Spacing**: `p-4`, `m-2`, `space-y-4`, etc.
- **Borders & Radius**: `border`, `rounded-lg`, etc.
- **And many more!**

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
