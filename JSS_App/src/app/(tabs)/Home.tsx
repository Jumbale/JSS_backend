import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "expo-router/build/react-navigation/bottom-tabs";
import React from "react";
import {
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

export default function Home() {
  const { studentName, admissionNumber, schoolName, studentGrade } = useAppContext();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const wavingHand = String.fromCodePoint(0x1f44b);

  const quickActions = [
    {
      id: "results",
      title: "Results",
      subtitle: "Exam scores",
      icon: "clipboard-list" as const,
      color: "#2563EB",
      bgColor: "#EFF6FF",
    },
    {
      id: "fees",
      title: "Fees",
      subtitle: "Balances & history",
      icon: "file-invoice-dollar" as const,
      color: "#16A34A",
      bgColor: "#F0FDF4",
    },
    {
      id: "subjects",
      title: "Subjects",
      subtitle: "Curriculum units",
      icon: "book-open" as const,
      color: "#9333EA",
      bgColor: "#FAF5FF",
    },
    {
      id: "attendance",
      title: "Attendance",
      subtitle: "96% Record",
      icon: "calendar-check" as const,
      color: "#D97706",
      bgColor: "#FFFBEB",
    },
  ];

  const announcements = [
    {
      id: "1",
      title: "Term 2 Mid-term Assessments Released",
      category: "Academic",
      time: "2 hours ago",
      icon: "document-text-outline" as const,
      badgeColor: "#EFF6FF",
      badgeText: "#2563EB",
      description: "Class teachers have uploaded evaluation rubrics and scores for Grade 7 & 8.",
    },
    {
      id: "2",
      title: "Inter-School Science Fair Registrations",
      category: "Event",
      time: "Yesterday",
      icon: "flask-outline" as const,
      badgeColor: "#FAF5FF",
      badgeText: "#9333EA",
      description: "Junior Secondary participants are requested to submit project abstracts by Friday.",
    },
    {
      id: "3",
      title: "Term 2 Fee Clearance Notice",
      category: "Finance",
      time: "3 days ago",
      icon: "card-outline" as const,
      badgeColor: "#F0FDF4",
      badgeText: "#16A34A",
      description: "Kindly verify payment receipts with the bursar office for timely clearance.",
    },
  ];

  return (
    <View style={[styles.screen, isDark && styles.screenDark]}>
      {/* Hero Header */}
      <LinearGradient
        colors={
          isDark
            ? ["#0F172A", "#1E3A8A"]
            : ["#1E3A8A", "#2563EB", "#1D4ED8"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: Math.max(insets.top, 16) + 10 }]}
      >
        <View style={styles.headerTopRow}>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>
              {greeting}, {wavingHand}
            </Text>
            <Text style={styles.studentNameText} numberOfLines={1}>
              {studentName || "Student"}
            </Text>
            <View style={styles.metaRow}>
              <View style={styles.admissionPill}>
                <Ionicons name="id-card-outline" size={12} color="#FFFFFF" />
                <Text style={styles.admissionText}>
                  {admissionNumber || "ADM0001"}
                </Text>
              </View>
              {studentGrade ? (
                <View style={styles.gradePill}>
                  <Text style={styles.gradeText}>{studentGrade}</Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.avatarBadge}>
            <FontAwesome6 name="graduation-cap" size={26} color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>

      {/* Main Content Scroll View */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: tabBarHeight + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* School Overview Card */}
        <View style={[styles.schoolCard, isDark && styles.cardDark]}>
          <View style={styles.schoolIconCircle}>
            <FontAwesome6 name="school" color={AppTheme.colors.primaryLight} size={20} />
          </View>
          <View style={styles.schoolDetails}>
            <Text style={[styles.schoolName, isDark && styles.textLight]} numberOfLines={1}>
              {schoolName || "Junior Secondary School"}
            </Text>
            <Text style={styles.schoolPortalLabel}>
              JSS Student Portal • Academic Year 2024/2025
            </Text>
          </View>
          <View style={styles.termBadge}>
            <Text style={styles.termBadgeText}>Term 2</Text>
          </View>
        </View>

        {/* Academic Performance Snapshot */}
        <View style={[styles.performanceCard, isDark && styles.cardDark]}>
          <View style={styles.perfHeader}>
            <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
              Academic Snapshot
            </Text>
            <View style={styles.perfRatingBadge}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.perfRatingText}>Exceeding Expectations</Text>
            </View>
          </View>
          <View style={styles.perfStatsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>78%</Text>
              <Text style={styles.statLabel}>Term Average</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>4th</Text>
              <Text style={styles.statLabel}>Class Rank</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>96%</Text>
              <Text style={styles.statLabel}>Attendance</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
            Quick Actions
          </Text>
          <Text style={styles.sectionSubtitle}>Portal Services</Text>
        </View>

        <View style={styles.quickGrid}>
          {quickActions.map((action) => (
            <Pressable
              key={action.id}
              style={({ pressed }) => [
                styles.quickCard,
                isDark && styles.quickCardDark,
                pressed && styles.quickCardPressed,
              ]}
              android_ripple={{ color: "rgba(37, 99, 235, 0.1)", borderless: false }}
            >
              <View
                style={[
                  styles.quickIconContainer,
                  { backgroundColor: action.bgColor },
                ]}
              >
                <FontAwesome6 name={action.icon} color={action.color} size={22} />
              </View>
              <Text style={[styles.quickCardTitle, isDark && styles.textLight]}>
                {action.title}
              </Text>
              <Text style={styles.quickCardSubtitle}>{action.subtitle}</Text>
            </Pressable>
          ))}
        </View>

        {/* Announcements & Updates */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
            Recent Announcements
          </Text>
          <Ionicons name="notifications-outline" size={18} color={AppTheme.colors.primaryLight} />
        </View>

        <View style={styles.announcementsList}>
          {announcements.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.announcementCard,
                isDark && styles.cardDark,
                pressed && { opacity: 0.9 },
              ]}
            >
              <View style={styles.announcementTopRow}>
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: item.badgeColor },
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryBadgeText,
                      { color: item.badgeText },
                    ]}
                  >
                    {item.category}
                  </Text>
                </View>
                <Text style={styles.announcementTime}>{item.time}</Text>
              </View>

              <Text style={[styles.announcementTitle, isDark && styles.textLight]}>
                {item.title}
              </Text>
              <Text style={styles.announcementDesc}>{item.description}</Text>
            </Pressable>
          ))}
        </View>
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
  headerGradient: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#1E40AF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greetingContainer: {
    flex: 1,
    paddingRight: 12,
  },
  greetingText: {
    color: "#BFDBFE",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  studentNameText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 2,
    letterSpacing: 0.2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 8,
  },
  admissionPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: AppTheme.roundness.full,
    gap: 5,
  },
  admissionText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  gradePill: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: AppTheme.roundness.full,
  },
  gradeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  avatarBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollArea: {
    flex: 1,
    marginTop: -8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  schoolCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: AppTheme.roundness.lg,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  cardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  schoolIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: AppTheme.colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  schoolDetails: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  schoolPortalLabel: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  termBadge: {
    backgroundColor: AppTheme.colors.primarySoft,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: AppTheme.roundness.full,
  },
  termBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: AppTheme.colors.primary,
  },
  performanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.lg,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  perfHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  perfRatingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: AppTheme.roundness.full,
    gap: 4,
  },
  perfRatingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#B45309",
  },
  perfStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 4,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: AppTheme.colors.primaryLight,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: AppTheme.colors.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: AppTheme.colors.border,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: AppTheme.colors.textSecondary,
  },
  textLight: {
    color: "#F8FAFC",
  },
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  quickCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.lg,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  quickCardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  quickCardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  quickIconContainer: {
    width: 46,
    height: 46,
    borderRadius: AppTheme.roundness.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  quickCardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  quickCardSubtitle: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  announcementsList: {
    gap: 12,
  },
  announcementCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  announcementTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  categoryBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: AppTheme.roundness.sm,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  announcementTime: {
    fontSize: 11,
    color: AppTheme.colors.textMuted,
    fontWeight: "500",
  },
  announcementTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: AppTheme.colors.text,
    marginBottom: 4,
  },
  announcementDesc: {
    fontSize: 13,
    color: AppTheme.colors.textSecondary,
    lineHeight: 18,
  },
});
