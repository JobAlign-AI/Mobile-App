import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [emailFocused, setEmailFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);

  const onGoogleSignIn = async () => {
    if (googleLoading) return;

    setGoogleLoading(true);
    try {
      const { createdSessionId, setActive: setActiveOAuth } =
        await startOAuthFlow();

      if (createdSessionId && setActiveOAuth) {
        await setActiveOAuth({ session: createdSessionId });
        router.replace("/(tabs)/home");
      }
    } catch (err: any) {
      console.error("Google sign in error:", err);
      Alert.alert(
        "Google Sign In Failed",
        "Unable to sign in with Google. Please try again.",
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const onSignInPress = async () => {
    if (!isLoaded || loading) return;

    // Validate inputs
    if (!emailAddress.trim()) {
      Alert.alert(
        "Email Required",
        "Please enter your email address to continue.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    if (!password.trim()) {
      Alert.alert(
        "Password Required",
        "Please enter your password to continue.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting sign in...");

      const signInAttempt = await signIn.create({
        identifier: emailAddress.trim(),
        password,
      });

      console.log("Sign in status:", signInAttempt.status);

      if (signInAttempt.status === "complete") {
        console.log("Sign in successful!");
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/home");
      } else {
        console.log("Sign in incomplete:", signInAttempt.status);
        Alert.alert(
          "Sign In Incomplete",
          "Unable to complete sign in. Please try again or contact support.",
          [{ text: "OK", style: "default" }]
        );
      }
    } catch (err: any) {
      console.error("Sign in error:", err);

      // Parse error message
      let title = "Sign In Failed";
      let message = "Please check your credentials and try again.";

      if (err.errors && err.errors.length > 0) {
        const error = err.errors[0];
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);

        // Handle specific error codes
        switch (error.code) {
          case "form_identifier_not_found":
            title = "Account Not Found";
            message =
              "No account exists with this email address. Would you like to create one?";
            Alert.alert(title, message, [
              { text: "Cancel", style: "cancel" },
              {
                text: "Sign Up",
                style: "default",
                onPress: () => router.push("/(auth)/sign-up"),
              },
            ]);
            return;

          case "form_password_incorrect":
            title = "Incorrect Password";
            message =
              "The password you entered is incorrect. Please try again.";
            break;

          case "form_param_format_invalid":
            title = "Invalid Email";
            message = "Please enter a valid email address.";
            break;

          default:
            message = error.longMessage || error.message || message;
        }
      }

      Alert.alert(title, message, [{ text: "OK", style: "default" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#0A0A0A", "#1A1A1A", "#2A2A2A"]}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="person-circle-outline"
                size={32}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.title}>WELCOME BACK</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.form}>
            {/* Google Sign In Button */}
            <TouchableOpacity
              onPress={onGoogleSignIn}
              disabled={googleLoading}
              activeOpacity={0.85}
              style={styles.googleButton}
            >
              <View style={styles.googleButtonContent}>
                <Ionicons name="logo-google" size={18} color="#4285F4" />
                <Text style={styles.googleButtonText}>
                  {googleLoading ? "Signing in..." : "Continue with Google"}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <View
              style={[styles.inputWrapper, emailFocused && styles.inputFocused]}
            >
              <Ionicons name="mail-outline" size={18} color="#999999" />
              <TextInput
                style={styles.input}
                value={emailAddress}
                onChangeText={setEmailAddress}
                placeholder="Enter your email"
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
            </View>

            <Text style={styles.label}>PASSWORD</Text>
            <View
              style={[
                styles.inputWrapper,
                passwordFocused && styles.inputFocused,
              ]}
            >
              <Ionicons name="lock-closed-outline" size={18} color="#999999" />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#666666"
                secureTextEntry
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </View>

            <TouchableOpacity
              onPress={onSignInPress}
              disabled={loading}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#FFFFFF", "#E0E0E0"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {loading ? "SIGNING IN..." : "SIGN IN"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Don't have an account? </Text>
              <Link href="/(auth)/sign-up">
                <Text style={styles.linkHighlight}>Sign Up</Text>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

/* ----------------------------
   Modern Dark Theme
   ---------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    backgroundColor: "rgba(26, 26, 26, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#999999",
    marginTop: 2,
    letterSpacing: 0.5,
  },
  form: {
    width: "100%",
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999999",
    marginBottom: 6,
    marginTop: 12,
    letterSpacing: 1.2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 6,
  },
  inputFocused: {
    borderColor: "#FFFFFF",
    borderWidth: 2,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#FFFFFF",
    marginLeft: 10,
    fontWeight: "500",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#999999",
    fontSize: 14,
    fontWeight: "500",
  },
  linkHighlight: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleButtonText: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 10,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dividerText: {
    color: "#999999",
    fontSize: 12,
    fontWeight: "600",
    marginHorizontal: 12,
    letterSpacing: 1,
  },
});
