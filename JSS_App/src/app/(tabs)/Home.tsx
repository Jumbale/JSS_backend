import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useBottomTabBarHeight } from "expo-router/build/react-navigation/bottom-tabs";
import React, { useState } from "react";
import {
  Modal,
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

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<{
    id: string;
    title: string;
    category: string;
    time: string;
    icon: any;
    badgeColor: string;
    badgeText: string;
    description: string;
    fullDetails?: string;
    actionText?: string;
  } | null>(null);

  const [selectedInfoModal, setSelectedInfoModal] = useState<{
    title: string;
    content: string;
  } | null>(null);

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
      fullDetails:
        "Class teachers have finalized and uploaded the CBC strand rubrics, competency evaluations, and composite scores for Grade 7 & 8 learners. Performance indicators reflect Competency-Based Curriculum (CBC) proficiency across all 9 core learning areas.",
      actionText: "View Performance Analytics",
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
      fullDetails:
        "The annual Sub-County Science & Innovation Fair is scheduled for next month. JSS learners registered in the Science Club should submit their innovation project abstracts to the club patron in Science Lab 2 by Friday 4:00 PM.",
      actionText: "Got It",
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
      fullDetails:
        "All parents and guardians are reminded to settle outstanding Term 2 school fee balances before the assessment week. You can make payments instantly through Safaricom M-PESA Paybill 522123 using your Admission Number as the Account Number.",
      actionText: "Proceed to Fee Payment",
    },
  ];

  const handleAnnouncementPress = (item: (typeof announcements)[0]) => {
    if (item.category === "Finance") {
      router.push("/FeePayment");
    } else {
      setSelectedAnnouncement(item);
    }
  };

  const handleQuickActionPress = (id: string) => {
    if (id === "fees") {
      router.push("/FeePayment");
    } else if (id === "results") {
      router.push("/(tabs)/Dashboard");
    } else if (id === "subjects") {
      setSelectedInfoModal({
        title: "CBC Curriculum Subjects",
        content:
          "Enrolled in 9 CBC Core Learning Areas: Mathematics, English, Kiswahili, Integrated Science, Social Studies, Agriculture & Nutrition, CRE, Pre-Technical Studies, and Creative Arts & Sports.",
      });
    } else if (id === "attendance") {
      setSelectedInfoModal({
        title: "Term Attendance Record",
        content:
          "Term 2 Attendance Rate: 96% (48 out of 50 school sessions attended). 0 unexcused absences recorded. Punctuality record: Excellent.",
      });
    }
  };

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
              onPress={() => handleQuickActionPress(action.id)}
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
          {announcements.map((item) => {
            const isFinance = item.category === "Finance";
            return (
              <Pressable
                key={item.id}
                onPress={() => handleAnnouncementPress(item)}
                style={({ pressed }) => [
                  styles.announcementCard,
                  isDark && styles.cardDark,
                  {
                    borderLeftWidth: 4,
                    borderLeftColor: isFinance
                      ? (isDark ? "#22C55E" : "#16A34A")
                      : item.badgeText,
                  },
                  isFinance && (isDark ? styles.financeCardDark : styles.financeCardLight),
                  pressed && styles.announcementCardPressed,
                ]}
                android_ripple={{
                  color: isFinance
                    ? "rgba(22, 163, 74, 0.12)"
                    : "rgba(37, 99, 235, 0.1)",
                  borderless: false,
                }}
              >
                <View style={styles.announcementTopRow}>
                  <View style={styles.announcementBadgeGroup}>
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

                  <View style={styles.announcementChevronBox}>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color={
                        isFinance
                          ? "#16A34A"
                          : isDark
                          ? "#64748B"
                          : "#94A3B8"
                      }
                    />
                  </View>
                </View>

                <Text style={[styles.announcementTitle, isDark && styles.textLight]}>
                  {item.title}
                </Text>
                <Text style={styles.announcementDesc}>{item.description}</Text>

                {isFinance && (
                  <View style={styles.financeActionRow}>
                    <View style={styles.financePaybillPill}>
                      <Ionicons name="card-outline" size={13} color="#16A34A" />
                      <Text style={styles.financePaybillText}>
                        Paybill: 522123 • Adm No
                      </Text>
                    </View>
                    <View style={styles.payNowBtn}>
                      <Text style={styles.payNowBtnText}>Pay Now</Text>
                      <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Announcement Details Modal */}
      <Modal
        visible={!!selectedAnnouncement}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedAnnouncement(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, isDark && styles.modalCardDark]}>
            {selectedAnnouncement && (
              <>
                <View style={styles.modalHeaderRow}>
                  <View
                    style={[
                      styles.categoryBadge,
                      { backgroundColor: selectedAnnouncement.badgeColor },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryBadgeText,
                        { color: selectedAnnouncement.badgeText },
                      ]}
                    >
                      {selectedAnnouncement.category}
                    </Text>
                  </View>
                  <Text style={styles.modalTimeText}>
                    {selectedAnnouncement.time}
                  </Text>
                </View>

                <Text
                  style={[styles.modalTitle, isDark && styles.textLight]}
                >
                  {selectedAnnouncement.title}
                </Text>

                <View style={styles.modalBodyBox}>
                  <Text style={styles.modalBodyText}>
                    {selectedAnnouncement.fullDetails ||
                      selectedAnnouncement.description}
                  </Text>
                </View>

                <View style={styles.modalButtonsRow}>
                  {selectedAnnouncement.category === "Academic" ? (
                    <Pressable
                      style={styles.modalPrimaryBtn}
                      onPress={() => {
                        setSelectedAnnouncement(null);
                        router.push("/(tabs)/Dashboard");
                      }}
                    >
                      <Text style={styles.modalPrimaryBtnText}>
                        View Dashboard Analytics
                      </Text>
                    </Pressable>
                  ) : null}

                  <Pressable
                    style={[
                      styles.modalCloseBtn,
                      selectedAnnouncement.category !== "Academic" &&
                        styles.modalCloseBtnFull,
                    ]}
                    onPress={() => setSelectedAnnouncement(null)}
                  >
                    <Text style={styles.modalCloseBtnText}>Close</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Info Modal for Quick Actions */}
      <Modal
        visible={!!selectedInfoModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedInfoModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, isDark && styles.modalCardDark]}>
            {selectedInfoModal && (
              <>
                <Text
                  style={[styles.modalTitle, isDark && styles.textLight]}
                >
                  {selectedInfoModal.title}
                </Text>

                <View style={styles.modalBodyBox}>
                  <Text style={styles.modalBodyText}>
                    {selectedInfoModal.content}
                  </Text>
                </View>

                <Pressable
                  style={[styles.modalCloseBtn, styles.modalCloseBtnFull]}
                  onPress={() => setSelectedInfoModal(null)}
                >
                  <Text style={styles.modalCloseBtnText}>Got It</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
  },
  cardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
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
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
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
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
  },
  quickCardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
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
    gap: 14,
  },
  announcementCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.lg,
    padding: 16,
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
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
  announcementCardPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.9,
  },
  announcementBadgeGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  announcementChevronBox: {
    padding: 2,
  },
  financeCardLight: {
    borderColor: "#22C55E",
    backgroundColor: "#F0FDF4",
  },
  financeCardDark: {
    borderColor: "#16A34A",
    backgroundColor: "#062817",
  },
  financeActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1.5,
    borderTopColor: "rgba(22, 163, 74, 0.25)",
  },
  financePaybillPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#DCFCE7",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: AppTheme.roundness.sm,
  },
  financePaybillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#166534",
  },
  payNowBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#16A34A",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: AppTheme.roundness.full,
  },
  payNowBtnText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.xl,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  modalCardDark: {
    backgroundColor: "#1E293B",
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  modalTimeText: {
    fontSize: 12,
    color: AppTheme.colors.textMuted,
    fontWeight: "500",
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: AppTheme.colors.text,
    marginBottom: 10,
  },
  modalBodyBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: AppTheme.roundness.md,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  modalBodyText: {
    fontSize: 13,
    color: AppTheme.colors.textSecondary,
    lineHeight: 20,
  },
  modalButtonsRow: {
    flexDirection: "row",
    gap: 10,
  },
  modalPrimaryBtn: {
    flex: 1,
    backgroundColor: AppTheme.colors.primaryLight,
    paddingVertical: 12,
    borderRadius: AppTheme.roundness.md,
    alignItems: "center",
    justifyContent: "center",
  },
  modalPrimaryBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  modalCloseBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: AppTheme.roundness.md,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseBtnFull: {
    width: "100%",
  },
  modalCloseBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: AppTheme.colors.textSecondary,
  },
});
