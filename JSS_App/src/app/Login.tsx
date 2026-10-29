import PressableElemet, { Card } from "@/components/PressableElemet";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useState } from "react";
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
import StudentLogin from "../ApiServices/StudentLogin";
import { useAppContext } from "../components/AuthProviderApi";
import DropdownComp from "../components/DropdownComp";
import { ErrorMessageBox } from "../components/successErrorMessage";
import { AppTheme } from "../constants/theme";

export default function Login() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const {
    setStudentName,
    setSchoolName,
    setAdmissionNumber,
    setStudentGrade,
    selectedRole,
  } = useAppContext();

  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");
  const [error, setError] = useState(false);

  const [fieldEmptyMessageSchool, setFieldEmptyMessageSchool] = useState("");
  const [fieldEmptyMessagePassword, setFieldEmptyMessagePassword] =
    useState("");
  const [fieldEmptyMessageRole, setFieldEmptyMessageRole] = useState("");

  const role = selectedRole;

  const triggerLogin = async () => {
    let hasError = false;

    if (!school.trim()) {
      setFieldEmptyMessageSchool("Please enter your school name");
      hasError = true;
    } else {
      setFieldEmptyMessageSchool("");
    }

    if (!password.trim()) {
      setFieldEmptyMessagePassword("please enter admission number");
      hasError = true;
    } else {
      setFieldEmptyMessagePassword("");
    }

    if (!role?.trim()) {
      setFieldEmptyMessageRole("Please select your role");
      hasError = true;
    } else {
      setFieldEmptyMessageRole("");
    }

    if (hasError) return;

    setLoading(true);
    try {
      const studentsDetails = { school, password, role };
      const results = await StudentLogin(studentsDetails);

      if (results.success === true) {
        setSchoolName(results.school);
        setAdmissionNumber(results.admNumber);
        setStudentName(results.studentName);
        setStudentGrade(results.Grade);

        router.replace("/(tabs)/Home");
      } else {
        setLoginErrorMessage(
          results.message || "Invalid credentials, please try again.",
        );
        setError(true);

        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    } catch (err) {
      setLoginErrorMessage("Network error. Please check your connection.");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 4000);
    } finally {
      setLoading(false);
    }
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
              {/* Top Navigation Row */}
              <View style={styles.navRow}>
                <Link href="/" asChild>
                  <Pressable style={styles.backButton}>
                    <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
                  </Pressable>
                </Link>
                <View style={styles.academicBadge}>
                  <Ionicons name="shield-checkmark" size={16} color="#93C5FD" />
                  <Text style={styles.academicBadgeText}>Secure Portal</Text>
                </View>
              </View>

              {/* Header Title Section */}
              <View style={styles.headerSection}>
                <View style={styles.iconCircle}>
                  <FontAwesome6
                    name="user-graduate"
                    size={32}
                    color="#FFFFFF"
                  />
                </View>
                <Text style={styles.heading}>Welcome Back</Text>
                <Text style={styles.subheading}>
                  Sign in to your JSS Student & Staff Portal
                </Text>
              </View>

              {/* Login Form Card */}
              <View style={styles.card}>
                {error && (
                  <View style={styles.errorWrapper}>
                    <ErrorMessageBox message={loginErrorMessage} />
                  </View>
                )}

                {/* School Name Field with React Native Paper */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.inputLabel}>School</Text>
                  <TextInput
                    mode="outlined"
                    placeholder="Enter school name"
                    value={school}
                    onChangeText={(text) => {
                      setSchool(text);
                      if (fieldEmptyMessageSchool)
                        setFieldEmptyMessageSchool("");
                    }}
                    left={
                      <TextInput.Icon
                        icon="school-outline"
                        color={AppTheme.colors.primaryLight}
                      />
                    }
                    outlineColor={
                      fieldEmptyMessageSchool
                        ? AppTheme.colors.error
                        : AppTheme.colors.borderStrong
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
                  {fieldEmptyMessageSchool ? (
                    <HelperText
                      type="error"
                      visible={true}
                      style={styles.helperText}
                    >
                      {fieldEmptyMessageSchool}
                    </HelperText>
                  ) : null}
                </View>

                {/* Password / Admission Number Field with React Native Paper */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    mode="outlined"
                    placeholder="Enter admission number"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (fieldEmptyMessagePassword)
                        setFieldEmptyMessagePassword("");
                    }}
                    secureTextEntry={isSecure}
                    autoCapitalize="none"
                    left={
                      <TextInput.Icon
                        icon="lock-outline"
                        color={AppTheme.colors.primaryLight}
                      />
                    }
                    right={
                      <TextInput.Icon
                        icon={isSecure ? "eye-outline" : "eye-off-outline"}
                        color={AppTheme.colors.textMuted}
                        onPress={() => setIsSecure(!isSecure)}
                      />
                    }
                    outlineColor={
                      fieldEmptyMessagePassword
                        ? AppTheme.colors.error
                        : AppTheme.colors.borderStrong
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
                  {fieldEmptyMessagePassword ? (
                    <HelperText
                      type="error"
                      visible={true}
                      style={styles.helperText}
                    >
                      {fieldEmptyMessagePassword}
                    </HelperText>
                  ) : null}
                </View>

                {/* Role Dropdown */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.inputLabel}>Role</Text>
                  <DropdownComp />
                  {fieldEmptyMessageRole ? (
                    <HelperText
                      type="error"
                      visible={true}
                      style={styles.helperText}
                    >
                      {fieldEmptyMessageRole}
                    </HelperText>
                  ) : null}
                </View>

                {/* Submit Action */}
                <View style={styles.submitContainer}>
                  <PressableElemet
                    onPress={triggerLogin}
                    // title="Sign In"
                    //loading={loading}
                  />
                </View>

                {/* Card footer links */}
                <Card />
              </View>

              {/* Bottom Support Footer */}
              <View style={styles.footerNote}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#CBD5E1"
                />
                <Text style={styles.footerText}>
                  Need help accessing your account? Contact your your school
                  admin.
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
    marginBottom: 16,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  academicBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: AppTheme.roundness.full,
    gap: 6,
  },
  academicBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
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
    marginBottom: 12,
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
    marginTop: 4,
    textAlign: "center",
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
  errorWrapper: {
    marginBottom: 12,
  },
  fieldContainer: {
    marginBottom: 10,
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
    marginTop: 2,
    fontSize: 12,
  },
  submitContainer: {
    marginTop: 10,
  },
  footerNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    paddingHorizontal: 16,
    gap: 6,
  },
  footerText: {
    color: "#E2E8F0",
    fontSize: 12,
    textAlign: "center",
    flex: 1,
  },
});
