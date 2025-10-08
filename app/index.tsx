import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Page() {
  const { isSignedIn } = useAuth();

  // If signed in, redirect to home
  if (isSignedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  // If not signed in, redirect to sign-up page (create account)
  return <Redirect href="/(auth)/sign-in" />;
}
