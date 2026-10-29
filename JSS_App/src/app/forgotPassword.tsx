import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import PressableElemet from "../components/PressableElemet";
import SuccessMessageBox, { ErrorMessageBox } from "../components/successErrorMessage";
import { AppTheme } from "../constants/theme";

export default function ForgotPassword() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [identifier, setIdentifier] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetRequest = () => {
    if (!identifier.trim()) {
      setErrorMsg("Please enter your registered admission number or school email.");
      setSuccessMsg("");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    // Simulate sending reset request
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(
        "Password reset instructions have been logged. Please contact your school administrator or check your school email."
      );
    }, 1200);
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={
          isDark
            ? ["#0F172A", "#1E293B", "#0F172A"]
            : ["#1E3A8A", "#2563EB", "#1D4ED8"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Back navigation */}
              <View style={styles.navRow}>
                <Pressable
                  style={styles.backButton}
                  onPress={() => router.back()}
                  hitSlop={10}
                >
                  <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
                </Pressable>
                <Link href="/Login" asChild>
                  <Pressable style={styles.loginLinkButton}>
                    <Text style={styles.loginLinkText}>Back to Sign In</Text>
                  </Pressable>
                </Link>
              </View>

              {/* Header Illustration */}
              <View style={styles.headerSection}>
                <View style={styles.iconCircle}>
                  <FontAwesome6 name="key" size={28} color="#FFFFFF" />
                </View>
                <Text style={styles.heading}>Forgot Password?</Text>
                <Text style={styles.subheading}>
                  Don't worry! Enter your Admission Number or registered school email
                  to request a password reset.
                </Text>
              </View>

              {/* Form Card */}
              <View style={styles.card}>
                {errorMsg ? (
                  <View style={styles.alertWrapper}>
                    <ErrorMessageBox message={errorMsg} />
                  </View>
                ) : null}

                {successMsg ? (
                  <View style={styles.alertWrapper}>
                    <SuccessMessageBox message={successMsg} />
                  </View>
                ) : null}

                <View style={styles.fieldContainer}>
                  <Text style={styles.inputLabel}>
                    Admission Number or School Email
                  </Text>
                  <TextInput
                    mode="outlined"
                    placeholder="e.g. ADM0012 or student@school.ac.ke"
                    value={identifier}
                    onChangeText={(val) => {
                      setIdentifier(val);
                      if (errorMsg) setErrorMsg("");
                    }}
                    autoCapitalize="none"
                    left={
                      <TextInput.Icon
                        icon="account-key-outline"
                        color={AppTheme.colors.primaryLight}
                      />
                    }
                    outlineColor={
                      errorMsg ? AppTheme.colors.error : AppTheme.colors.borderStrong
                    }
                    activeOutlineColor={AppTheme.colors.primaryLight}
                    textColor={AppTheme.colors.text}
                    style={styles.paperInput}
                    theme={{
                      roundness: AppTheme.roundness.md,
                      colors: {
                        background: "#FFFFFF",
                      },
                    }}
                  />
                  <HelperText type="info" visible={true} style={styles.helperText}>
                    Your class administrator will verify your registered identity.
                  </HelperText>
                </View>

                <View style={styles.submitContainer}>
                  <PressableElemet
                    onPress={handleResetRequest}
                    title="Send Reset Request"
                    loading={loading}
                  />
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.footerPrompt}>Remembered your credentials?</Text>
                  <Link href="/Login" asChild>
                    <Pressable hitSlop={8}>
                      <Text style={styles.signInLink}>Sign In now</Text>
                    </Pressable>
                  </Link>
                </View>
              </View>

              {/* Help & Support note */}
              <View style={styles.supportNote}>
                <Ionicons name="school-outline" size={16} color="#CBD5E1" />
                <Text style={styles.supportText}>
                  Junior Secondary School Student Information System
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
    justifyContent: "center",
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  loginLinkButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: AppTheme.roundness.full,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  loginLinkText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  subheading: {
    fontSize: 14,
    color: "#BFDBFE",
    marginTop: 6,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 320,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    borderRadius: AppTheme.roundness.xl,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  alertWrapper: {
    marginBottom: 12,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: AppTheme.colors.textSecondary,
    marginBottom: 6,
    marginLeft: 2,
  },
  paperInput: {
    backgroundColor: "#FFFFFF",
    fontSize: 15,
  },
  helperText: {
    paddingHorizontal: 4,
    marginTop: 4,
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
  },
  submitContainer: {
    marginTop: 10,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    gap: 6,
  },
  footerPrompt: {
    fontSize: 13,
    color: AppTheme.colors.textSecondary,
  },
  signInLink: {
    fontSize: 13,
    color: AppTheme.colors.primaryLight,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  supportNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingHorizontal: 16,
    gap: 6,
  },
  supportText: {
    color: "#E2E8F0",
    fontSize: 12,
    textAlign: "center",
  },
});
