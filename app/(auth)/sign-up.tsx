import * as React from "react";
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
import { useSignUp, useOAuth } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [googleLoading, setGoogleLoading] = React.useState(false);
  const [emailFocused, setEmailFocused] = React.useState(false);
  const [passwordFocused, setPasswordFocused] = React.useState(false);
  const [codeFocused, setCodeFocused] = React.useState(false);

  const onGoogleSignUp = async () => {
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
      console.error("Google sign up error:", err);
      Alert.alert(
        "Google Sign Up Failed",
        "Unable to sign up with Google. Please try again.",
        [{ text: "OK", style: "default" }]
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const onSignUpPress = async () => {
    if (!isLoaded || loading) return;

    // Validate inputs
    if (!emailAddress.trim()) {
      Alert.alert(
        "Email Required",
        "Please enter your email address to create an account.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    if (!password.trim()) {
      Alert.alert(
        "Password Required",
        "Please enter a password to secure your account.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Password Too Short",
        "Your password must be at least 8 characters long for security.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    setLoading(true);

    try {
      const result = await signUp.create({
        emailAddress: emailAddress.trim(),
        password,
      });
      console.log("Sign up created, status:", result.status);

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      console.log("Verification email sent");

      setPendingVerification(true);

      // Show success message
      Alert.alert(
        "Check Your Email",
        `We've sent a verification code to ${emailAddress.trim()}. Please check your inbox.`,
        [{ text: "OK", style: "default" }]
      );
    } catch (err: any) {
      console.error("Sign up error:", err);

      let title = "Sign Up Failed";
      let message = "Unable to create account. Please try again.";

      if (err.errors && err.errors.length > 0) {
        const error = err.errors[0];
        console.error("Error code:", error.code);

        switch (error.code) {
          case "form_identifier_exists":
            title = "Account Already Exists";
            message =
              "An account with this email already exists. Would you like to sign in instead?";
            Alert.alert(title, message, [
              { text: "Cancel", style: "cancel" },
              {
                text: "Sign In",
                style: "default",
                onPress: () => router.push("/(auth)/sign-in"),
              },
            ]);
            return;

          case "form_password_pwned":
            title = "Weak Password";
            message =
              "This password has been found in a data breach. Please choose a more secure password.";
            break;

          case "form_password_length_too_short":
            title = "Password Too Short";
            message = "Your password must be at least 8 characters long.";
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

  const onResendCode = async () => {
    if (!isLoaded || loading) return;
    setLoading(true);

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      Alert.alert(
        "Code Sent!",
        `A new verification code has been sent to ${emailAddress.trim()}. Please check your inbox.`,
        [{ text: "OK", style: "default" }]
      );
    } catch (err: any) {
      console.error("Resend error:", err);

      const errorMessage =
        err.errors?.[0]?.longMessage ||
        err.errors?.[0]?.message ||
        "Unable to resend code. Please try again.";

      Alert.alert("Resend Failed", errorMessage, [
        { text: "OK", style: "default" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onBackToSignUp = () => {
    setPendingVerification(false);
    setCode("");
  };

  const onVerifyPress = async () => {
    if (!isLoaded || loading) return;

    const trimmedCode = code.trim();

    if (!trimmedCode) {
      Alert.alert(
        "Code Required",
        "Please enter the verification code from your email.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    if (trimmedCode.length < 6) {
      Alert.alert(
        "Invalid Code",
        "Verification code must be 6 digits. Please check and try again.",
        [{ text: "OK", style: "default" }]
      );
      return;
    }

    if (!signUp) {
      Alert.alert(
        "Session Expired",
        "Your sign up session has expired. Please start over.",
        [
          {
            text: "Start Over",
            style: "default",
            onPress: () => {
              setPendingVerification(false);
              setCode("");
            },
          },
        ]
      );
      return;
    }

    setLoading(true);

    try {
      console.log("Attempting verification...");

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: trimmedCode,
      });

      console.log("Verification status:", completeSignUp.status);

      if (completeSignUp.status === "complete") {
        console.log("Sign up complete! Signing in...");
        await setActive({ session: completeSignUp.createdSessionId });

        Alert.alert(
          "Welcome! 🎉",
          "Your account has been created successfully.",
          [
            {
              text: "Get Started",
              style: "default",
              onPress: () => router.replace("/(tabs)/home"),
            },
          ]
        );
      } else if (completeSignUp.status === "missing_requirements") {
        console.log("Email verified, account created");

        Alert.alert(
          "Account Created! ✅",
          "Your email has been verified. Please sign in to continue.",
          [
            {
              text: "Sign In",
              style: "default",
              onPress: () => {
                setPendingVerification(false);
                setCode("");
                router.replace("/(auth)/sign-in");
              },
            },
          ]
        );
      } else {
        console.log("Unexpected status:", completeSignUp.status);
        Alert.alert(
          "Almost There",
          "Email verified successfully. Please sign in to complete setup.",
          [
            {
              text: "Sign In",
              style: "default",
              onPress: () => router.replace("/(auth)/sign-in"),
            },
          ]
        );
      }
    } catch (err: any) {
      console.error("Verification error:", err);

      let title = "Verification Failed";
      let message = "Please check the code and try again.";

      if (err.errors && err.errors.length > 0) {
        const error = err.errors[0];
        console.error("Error code:", error.code);

        switch (error.code) {
          case "form_code_incorrect":
            title = "Incorrect Code";
            message =
              "The verification code you entered is incorrect. Please check and try again.";
            break;

          case "verification_expired":
            title = "Code Expired";
            message =
              "This verification code has expired. Please request a new one.";
            break;

          case "form_param_format_invalid":
            title = "Invalid Code";
            message = "Please enter a valid 6-digit verification code.";
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

  /** ---------------------------
   *  Email verification screen
   *  ---------------------------
   */
  if (pendingVerification) {
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
            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackToSignUp}
              disabled={loading}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.header}>
              <View style={styles.iconCircle}>
                <Ionicons name="mail-outline" size={56} color="#FFFFFF" />
              </View>
              <Text style={styles.title}>VERIFY YOUR EMAIL</Text>
              <Text style={styles.subtitle}>
                Enter the verification code sent to{"\n"}
                <Text style={{ fontWeight: "700", color: "#FFFFFF" }}>
                  {emailAddress}
                </Text>
              </Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>VERIFICATION CODE</Text>
              <View
                style={[
                  styles.inputWrapper,
                  codeFocused && styles.inputFocused,
                ]}
              >
                <Ionicons name="key-outline" size={18} color="#999999" />
                <TextInput
                  style={styles.input}
                  value={code}
                  onChangeText={(text) => setCode(text.trim())}
                  placeholder="Enter 6-digit code"
                  placeholderTextColor="#666666"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="one-time-code"
                  onFocus={() => setCodeFocused(true)}
                  onBlur={() => setCodeFocused(false)}
                />
              </View>

              <TouchableOpacity
                onPress={onVerifyPress}
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
                    {loading ? "VERIFYING..." : "VERIFY EMAIL"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onResendCode}
                disabled={loading}
                style={styles.resendButton}
              >
                <Text style={styles.resendText}>
                  Didn't receive code? Resend
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  /** ---------------------------
   *  Initial sign-up form
   *  ---------------------------
   */
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
              <Ionicons name="person-add-outline" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>CREATE ACCOUNT</Text>
            <Text style={styles.subtitle}>Join us today and get started</Text>
          </View>

          <View style={styles.form}>
            {/* Google Sign Up Button */}
            <TouchableOpacity
              onPress={onGoogleSignUp}
              disabled={googleLoading}
              activeOpacity={0.85}
              style={styles.googleButton}
            >
              <View style={styles.googleButtonContent}>
                <Ionicons name="logo-google" size={18} color="#4285F4" />
                <Text style={styles.googleButtonText}>
                  {googleLoading
                    ? "Creating account..."
                    : "Continue with Google"}
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
                autoCapitalize="none"
                value={emailAddress}
                keyboardType="email-address"
                onChangeText={(email) => setEmailAddress(email)}
                placeholder="Enter your email"
                placeholderTextColor="#666666"
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
                onChangeText={(password) => setPassword(password)}
                placeholder="Enter your password"
                placeholderTextColor="#666666"
                secureTextEntry
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
            </View>

            <TouchableOpacity
              onPress={onSignUpPress}
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
                  {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Already have an account? </Text>
              <Link href="/(auth)/sign-in">
                <Text style={styles.linkHighlight}>Sign In</Text>
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
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
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
    textAlign: "center",
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
  resendButton: {
    marginTop: 16,
    alignItems: "center",
    paddingVertical: 10,
  },
  resendText: {
    color: "#999999",
    fontSize: 14,
    fontWeight: "600",
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
