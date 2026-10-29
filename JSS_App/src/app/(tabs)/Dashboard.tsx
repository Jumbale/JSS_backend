import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "expo-router/build/react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "../../components/AuthProviderApi";
import { AppTheme } from "../../constants/theme";

export default function Dashboard() {
  const { studentName, admissionNumber, studentGrade } = useAppContext();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [activeLinkId, setActiveLinkId] = useState<string>("results");

  const pieChartData = [
    { value: 120, color: "#10B981", text: "EE", level: "Level 4 - Exceeding" },
    { value: 100, color: "#3B82F6", text: "ME", level: "Level 3 - Meeting" },
    { value: 80, color: "#F59E0B", text: "AE", level: "Level 2 - Approaching" },
    { value: 40, color: "#EF4444", text: "BE", level: "Level 1 - Below" },
  ];

  const quickLinks = [
    {
      id: "results",
      title: "View Assessment Results",
      subtitle: "Detailed CBC strand evaluation and grades",
      icon: "document-text" as const,
      iconColor: "#2563EB",
      bgColor: "#EFF6FF",
    },
    {
      id: "fees",
      title: "Fee Statement & Ledger",
      subtitle: "View current balance, receipts, and invoices",
      icon: "receipt" as const,
      iconColor: "#16A34A",
      bgColor: "#F0FDF4",
    },
    {
      id: "timetable",
      title: "Weekly Class Timetable",
      subtitle: "View lessons, classroom venues, and teachers",
      icon: "calendar" as const,
      iconColor: "#8B5CF6",
      bgColor: "#FAF5FF",
    },
    {
      id: "curriculum",
      title: "CBC Curriculum Tracker",
      subtitle: "Track competencies across all 9 subjects",
      icon: "book" as const,
      iconColor: "#D97706",
      bgColor: "#FFFBEB",
    },
  ];

  return (
    <View style={[styles.screen, isDark && styles.screenDark]}>
      {/* Header Banner */}
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
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.headerSubtitle}>ACADEMIC DASHBOARD</Text>
            <Text style={styles.headerTitle}>Performance & Analytics</Text>
          </View>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Active Student</Text>
          </View>
        </View>

        {/* Student Summary Card */}
        <View style={[styles.studentCard, isDark && styles.studentCardDark]}>
          <View style={styles.studentAvatarCircle}>
            <Ionicons name="person" size={28} color="#FFFFFF" />
          </View>
          <View style={styles.studentMeta}>
            <Text style={[styles.studentCardName, isDark && styles.textLight]} numberOfLines={1}>
              {studentName || "Student Name"}
            </Text>
            <Text style={styles.studentCardSub}>
              Admission: {admissionNumber || "NGMN0002"}
            </Text>
            <View style={styles.gradeBadge}>
              <Ionicons name="school" size={13} color={AppTheme.colors.primaryLight} />
              <Text style={styles.gradeBadgeText}>
                {studentGrade || "Grade 7 - Stream Blue"}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Main Dashboard Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: tabBarHeight + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* KPI Metrics Summary */}
        <View style={[styles.kpiContainer, isDark && styles.cardDark]}>
          <View style={styles.kpiItem}>
            <Text style={styles.kpiValue}>75%</Text>
            <Text style={styles.kpiLabel}>Cumulative Avg</Text>
          </View>
          <View style={styles.kpiDivider} />
          <View style={styles.kpiItem}>
            <Text style={styles.kpiValue}>9 / 9</Text>
            <Text style={styles.kpiLabel}>Subjects Scored</Text>
          </View>
          <View style={styles.kpiDivider} />
          <View style={styles.kpiItem}>
            <Text style={styles.kpiValue}>Level 3</Text>
            <Text style={styles.kpiLabel}>CBC Proficiency</Text>
          </View>
        </View>

        {/* Performance Overview with Donut Chart */}
        <View style={[styles.analyticsCard, isDark && styles.cardDark]}>
          <View style={styles.analyticsHeader}>
            <View>
              <Text style={[styles.cardHeading, isDark && styles.textLight]}>
                Performance Distribution
              </Text>
              <Text style={styles.cardSubheading}>
                Competency levels breakdown (CBC Rubric)
              </Text>
            </View>
            <View style={styles.termTag}>
              <Text style={styles.termTagText}>Term 2</Text>
            </View>
          </View>

          <View style={styles.chartWrapper}>
            <View style={styles.chartContainer}>
              <PieChart
                data={pieChartData}
                donut
                radius={64}
                innerRadius={46}
                centerLabelComponent={() => (
                  <View style={styles.centerLabelBox}>
                    <Text style={styles.centerScoreText}>75%</Text>
                    <Text style={styles.centerScoreLabel}>Average</Text>
                  </View>
                )}
              />
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
              {pieChartData.map((item, index) => (
                <View key={index} style={styles.legendRow}>
                  <View
                    style={[styles.legendDot, { backgroundColor: item.color }]}
                  />
                  <Text style={[styles.legendLevel, isDark && styles.textLight]}>
                    {item.level}
                  </Text>
                  <Text style={styles.legendScore}>{item.value} pts</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Quick Links Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
            Quick Navigation
          </Text>
          <Text style={styles.sectionSubtitle}>Direct Records</Text>
        </View>

        <View style={styles.linksContainer}>
          {quickLinks.map((link) => {
            const isSelected = activeLinkId === link.id;
            return (
              <Pressable
                key={link.id}
                onPress={() => setActiveLinkId(link.id)}
                style={({ pressed }) => [
                  styles.linkCard,
                  isDark && styles.linkCardDark,
                  isSelected && styles.linkCardSelected,
                  pressed && { opacity: 0.85 },
                ]}
              >
                <View
                  style={[
                    styles.linkIconCircle,
                    { backgroundColor: link.bgColor },
                  ]}
                >
                  <Ionicons name={link.icon} color={link.iconColor} size={22} />
                </View>

                <View style={styles.linkInfo}>
                  <Text
                    style={[
                      styles.linkTitle,
                      isDark && styles.textLight,
                      isSelected && styles.linkTitleSelected,
                    ]}
                  >
                    {link.title}
                  </Text>
                  <Text style={styles.linkSubtitle} numberOfLines={1}>
                    {link.subtitle}
                  </Text>
                </View>

                <View style={styles.linkArrow}>
                  <FontAwesome6
                    name="chevron-right"
                    size={14}
                    color={
                      isSelected
                        ? AppTheme.colors.primaryLight
                        : isDark
                        ? "#64748B"
                        : "#94A3B8"
                    }
                  />
                </View>
              </Pressable>
            );
          })}
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
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#1E40AF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerSubtitle: {
    color: "#BFDBFE",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.4)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: AppTheme.roundness.full,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  statusText: {
    color: "#A7F3D0",
    fontSize: 11,
    fontWeight: "700",
  },
  studentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.lg,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  studentCardDark: {
    backgroundColor: "#1E293B",
  },
  studentAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: AppTheme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  studentMeta: {
    flex: 1,
  },
  studentCardName: {
    fontSize: 16,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  studentCardSub: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  gradeBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  gradeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: AppTheme.colors.primaryLight,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  kpiContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.lg,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  kpiItem: {
    alignItems: "center",
    flex: 1,
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: "800",
    color: AppTheme.colors.primaryLight,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: AppTheme.colors.textSecondary,
    marginTop: 3,
  },
  kpiDivider: {
    width: 1,
    height: 28,
    backgroundColor: AppTheme.colors.border,
  },
  cardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  analyticsCard: {
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
  analyticsHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  cardSubheading: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  termTag: {
    backgroundColor: AppTheme.colors.primarySoft,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: AppTheme.roundness.sm,
  },
  termTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: AppTheme.colors.primaryLight,
  },
  chartWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerLabelBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  centerScoreText: {
    fontSize: 16,
    fontWeight: "800",
    color: AppTheme.colors.text,
  },
  centerScoreLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: AppTheme.colors.textSecondary,
  },
  legendContainer: {
    flex: 1,
    paddingLeft: 16,
    gap: 8,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 8,
  },
  legendLevel: {
    fontSize: 11,
    fontWeight: "600",
    color: AppTheme.colors.text,
    flex: 1,
  },
  legendScore: {
    fontSize: 11,
    fontWeight: "700",
    color: AppTheme.colors.textSecondary,
    marginLeft: 6,
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
  linksContainer: {
    gap: 10,
  },
  linkCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: AppTheme.roundness.lg,
    borderWidth: 1.5,
    borderColor: AppTheme.colors.border,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  linkCardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#334155",
  },
  linkCardSelected: {
    borderColor: AppTheme.colors.primaryLight,
    backgroundColor: "#F0F7FF",
  },
  linkIconCircle: {
    width: 44,
    height: 44,
    borderRadius: AppTheme.roundness.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  linkInfo: {
    flex: 1,
  },
  linkTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  linkTitleSelected: {
    color: AppTheme.colors.primary,
  },
  linkSubtitle: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
  },
  linkArrow: {
    marginLeft: 10,
  },
});
