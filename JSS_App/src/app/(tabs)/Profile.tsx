import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useBottomTabBarHeight } from "expo-router/build/react-navigation/bottom-tabs";
import React from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "../../components/AuthProviderApi";
import { AppTheme } from "../../constants/theme";

export default function Profile() {
  const {
    studentName,
    admissionNumber,
    schoolName,
    studentGrade,
    selectedRole,
    setSchoolName,
    setAdmissionNumber,
    setStudentName,
    setSelectedRole,
    setStudentGrade,
  } = useAppContext();

  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out of JSS ElimuApp?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: () => {
          setStudentName(null);
          setAdmissionNumber(null);
          setSchoolName(null);
          setSelectedRole(null);
          setStudentGrade(null);
          router.replace("/Login");
        },
      },
    ]);
  };

  return (
    <View style={[styles.screen, isDark && styles.screenDark]}>
      {/* Profile Header Hero */}
      <LinearGradient
        colors={
          isDark
            ? ["#0F172A", "#1E3A8A"]
            : ["#1E3A8A", "#2563EB", "#1D4ED8"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerHero, { paddingTop: Math.max(insets.top, 16) + 12 }]}
      >
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarCircle}>
            <FontAwesome6 name="user-large" size={42} color="#FFFFFF" />
          </View>
          <View style={styles.cameraBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.profileName} numberOfLines={1}>
          {studentName || "Student Name"}
        </Text>

        <View style={styles.badgeRow}>
          <View style={styles.badgePill}>
            <Ionicons name="id-card-outline" size={13} color="#FFFFFF" />
            <Text style={styles.badgeText}>{admissionNumber || "NGMN0002"}</Text>
          </View>
          <View style={styles.badgePill}>
            <Ionicons name="school-outline" size={13} color="#FFFFFF" />
            <Text style={styles.badgeText}>{studentGrade || "Grade 7"}</Text>
          </View>
          <View style={[styles.badgePill, styles.roleBadge]}>
            <Text style={styles.roleBadgeText}>
              {selectedRole ? selectedRole.toUpperCase() : "STUDENT"}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Main Profile Details */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: tabBarHeight + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Personal Information */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={styles.cardHeader}>
            <View style={[styles.headerIconCircle, { backgroundColor: "#EFF6FF" }]}>
              <Ionicons name="person" size={18} color="#2563EB" />
            </View>
            <Text style={[styles.cardTitle, isDark && styles.textLight]}>
              Personal Information
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="person-outline" size={18} color={AppTheme.colors.textMuted} />
              <Text style={styles.infoLabel}>Full Name</Text>
            </View>
            <Text style={[styles.infoValue, isDark && styles.textLight]}>
              {studentName || "Student Name"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="id-card-outline" size={18} color={AppTheme.colors.textMuted} />
              <Text style={styles.infoLabel}>Admission Number</Text>
            </View>
            <Text style={[styles.infoValue, isDark && styles.textLight]}>
              {admissionNumber || "NGMN0002"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <FontAwesome6 name="chalkboard-user" size={16} color={AppTheme.colors.textMuted} />
              <Text style={styles.infoLabel}>Class Grade</Text>
            </View>
            <Text style={[styles.infoValue, isDark && styles.textLight]}>
              {studentGrade || "Grade 7"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="calendar-outline" size={18} color={AppTheme.colors.textMuted} />
              <Text style={styles.infoLabel}>Date of Birth</Text>
            </View>
            <Text style={[styles.infoValue, isDark && styles.textLight]}>
              12 / 05 / 2011
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="male-female-outline" size={18} color={AppTheme.colors.textMuted} />
              <Text style={styles.infoLabel}>Gender</Text>
            </View>
            <Text style={[styles.infoValue, isDark && styles.textLight]}>
              Male
            </Text>
          </View>
        </View>

        {/* Section 2: School Information */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={styles.cardHeader}>
            <View style={[styles.headerIconCircle, { backgroundColor: "#F0FDF4" }]}>
              <FontAwesome6 name="school" size={16} color="#16A34A" />
            </View>
            <Text style={[styles.cardTitle, isDark && styles.textLight]}>
              School Information
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <FontAwesome6 name="landmark" size={16} color={AppTheme.colors.textMuted} />
              <Text style={styles.infoLabel}>Institution</Text>
            </View>
            <Text style={[styles.infoValue, isDark && styles.textLight]} numberOfLines={1}>
              {schoolName || "Junior Secondary School"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="calendar-number-outline" size={18} color={AppTheme.colors.textMuted} />
              <Text style={styles.infoLabel}>Academic Year</Text>
            </View>
            <Text style={[styles.infoValue, isDark && styles.textLight]}>
              2024 / 2025
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="layers-outline" size={18} color={AppTheme.colors.textMuted} />
              <Text style={styles.infoLabel}>Current Term</Text>
            </View>
            <Text style={[styles.infoValue, isDark && styles.textLight]}>
              Term Two
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoLeft}>
              <Ionicons name="ribbon-outline" size={18} color={AppTheme.colors.textMuted} />
              <Text style={styles.infoLabel}>Curriculum</Text>
            </View>
            <Text style={[styles.infoValue, isDark && styles.textLight]}>
              CBC - JSS Stage
            </Text>
          </View>
        </View>

        {/* Section 3: Account Actions */}
        <View style={[styles.card, isDark && styles.cardDark]}>
          <View style={styles.cardHeader}>
            <View style={[styles.headerIconCircle, { backgroundColor: "#FAF5FF" }]}>
              <Ionicons name="settings-outline" size={18} color="#9333EA" />
            </View>
            <Text style={[styles.cardTitle, isDark && styles.textLight]}>
              Account & Security
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.7 }]}
            onPress={() => router.push("/forgotPassword")}
          >
            <View style={styles.actionLeft}>
              <Ionicons name="key-outline" size={20} color={AppTheme.colors.primaryLight} />
              <Text style={[styles.actionText, isDark && styles.textLight]}>
                Reset / Change Password
              </Text>
            </View>
            <FontAwesome6 name="chevron-right" size={14} color={AppTheme.colors.textMuted} />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({ pressed }) => [
              styles.actionButton,
              styles.logoutButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={handleLogout}
          >
            <View style={styles.actionLeft}>
              <Ionicons name="log-out-outline" size={20} color="#DC2626" />
              <Text style={styles.logoutText}>Sign Out</Text>
            </View>
            <FontAwesome6 name="chevron-right" size={14} color="#DC2626" />
          </Pressable>
        </View>

        <Text style={styles.versionFooter}>
          JSS ElimuApp v1.0.0 • Secure Portal
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  screenDark: {
    backgroundColor: "#0F172A",
  },
  headerHero: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: "center",
    shadowColor: "#1E40AF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  badgePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: AppTheme.roundness.full,
    gap: 5,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  roleBadge: {
    backgroundColor: "#FBBF24",
  },
  roleBadgeText: {
    color: "#78350F",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  scrollArea: {
    flex: 1,
    marginTop: -8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  headerIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: AppTheme.colors.textSecondary,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: AppTheme.colors.text,
    maxWidth: "50%",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: AppTheme.colors.border,
    marginVertical: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "600",
    color: AppTheme.colors.text,
  },
  logoutButton: {
    marginTop: 4,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
  },
  textLight: {
    color: "#F8FAFC",
  },
  versionFooter: {
    fontSize: 12,
    color: AppTheme.colors.textMuted,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 12,
  },
});
