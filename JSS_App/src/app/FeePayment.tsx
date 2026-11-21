import { FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "../components/AuthProviderApi";
import SuccessMessageBox from "../components/successErrorMessage";
import { AppTheme } from "../constants/theme";

type PaymentTab = "stk" | "manual" | "history";

export default function FeePayment() {
  const { studentName, admissionNumber, studentGrade, schoolName } =
    useAppContext();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Tab State
  const [activeTab, setActiveTab] = useState<PaymentTab>("stk");

  // Form States (UI only, no business logic)
  const officialPaybill = "522123";
  const defaultAccount = admissionNumber || "ADM0001";

  const [accountNumber, setAccountNumber] = useState(defaultAccount);
  const [amount, setAmount] = useState("15000");
  const [phoneNumber, setPhoneNumber] = useState("0712345678");
  const [selectedPreset, setSelectedPreset] = useState<string>("15000");

  // Manual payment verification code
  const [mPesaCode, setMPesaCode] = useState("");
  const [verifySuccess, setVerifySuccess] = useState(false);

  // Copy feedback state
  const [copiedField, setCopiedField] = useState<"paybill" | "account" | null>(
    null
  );

  // STK Push simulation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stkModalVisible, setStkModalVisible] = useState(false);

  // Copy simulator
  const handleCopy = (field: "paybill" | "account") => {
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2500);
  };

  // Amount preset selection
  const handleSelectPreset = (val: string) => {
    setSelectedPreset(val);
    setAmount(val);
  };

  // Trigger STK Push (UI Simulation)
  const handleInitiateSTK = () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Input Required", "Please enter a valid M-PESA phone number.");
      return;
    }
    if (!amount.trim() || Number(amount) <= 0) {
      Alert.alert("Input Required", "Please enter a valid payment amount.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStkModalVisible(true);
    }, 1000);
  };

  // Submit manual transaction code
  const handleSubmitCode = () => {
    if (!mPesaCode.trim()) {
      Alert.alert(
        "Missing Code",
        "Please enter the 10-character M-PESA confirmation code (e.g. QKH71890)."
      );
      return;
    }
    setVerifySuccess(true);
    setTimeout(() => {
      setMPesaCode("");
    }, 3000);
  };

  const pastReceipts = [
    {
      id: "REC-2024-001",
      title: "Term 2 First Installment",
      code: "QKR89412PX",
      date: "12 May 2024 • 10:45 AM",
      amount: "KES 20,000",
      status: "Verified",
      method: "M-PESA Paybill (522123)",
    },
    {
      id: "REC-2024-002",
      title: "Term 1 Balance Clearance",
      code: "PJ2910483M",
      date: "15 Jan 2024 • 02:20 PM",
      amount: "KES 15,000",
      status: "Verified",
      method: "M-PESA Paybill (522123)",
    },
    {
      id: "REC-2024-003",
      title: "Science Lab & Activity Fee",
      code: "ND8921045K",
      date: "05 Jan 2024 • 11:15 AM",
      amount: "KES 4,500",
      status: "Verified",
      method: "Bank Transfer",
    },
  ];

  return (
    <View style={[styles.screen, isDark && styles.screenDark]}>
      {/* Top Gradient Header */}
      <LinearGradient
        colors={
          isDark
            ? ["#0F172A", "#1E3A8A"]
            : ["#1E3A8A", "#2563EB", "#1D4ED8"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.headerGradient,
          { paddingTop: Math.max(insets.top, 16) + 8 },
        ]}
      >
        <View style={styles.headerTopRow}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </Pressable>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>School Fee Payment</Text>
            <Text style={styles.headerSubtitle}>
              M-PESA Paybill & Account Portal
            </Text>
          </View>

          <View style={styles.secureBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#10B981" />
            <Text style={styles.secureBadgeText}>Secured</Text>
          </View>
        </View>

        {/* Student & Fee Summary Card in Header */}
        <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
          <View style={styles.summaryTop}>
            <View style={styles.studentInfoLeft}>
              <View style={styles.studentIconBadge}>
                <FontAwesome6 name="user-graduate" size={16} color="#FFFFFF" />
              </View>
              <View>
                <Text
                  style={[styles.studentName, isDark && styles.textLight]}
                  numberOfLines={1}
                >
                  {studentName || "Student Account"}
                </Text>
                <Text style={styles.studentAdm}>
                  Adm: {admissionNumber || "ADM0001"} •{" "}
                  {studentGrade || "Grade 7"}
                </Text>
              </View>
            </View>

            <View style={styles.termTag}>
              <Text style={styles.termTagText}>Term 2</Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.balanceLabel}>Outstanding Balance</Text>
              <Text style={styles.balanceValue}>KES 15,000</Text>
            </View>
            <View style={styles.balanceStatsRight}>
              <View style={styles.subStat}>
                <Text style={styles.subStatLabel}>Invoiced:</Text>
                <Text style={styles.subStatValue}>KES 35,000</Text>
              </View>
              <View style={styles.subStat}>
                <Text style={styles.subStatLabel}>Paid to date:</Text>
                <Text style={[styles.subStatValue, { color: "#16A34A" }]}>
                  KES 20,000
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Main Body */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 32 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Official Paybill Details Card */}
          <View style={[styles.card, isDark && styles.cardDark, styles.paybillHeroCard]}>
            <View style={styles.paybillHeaderRow}>
              <View style={styles.mpesaBadge}>
                <Text style={styles.mpesaBadgeText}>M-PESA PAYBILL</Text>
              </View>
              <Text style={styles.schoolAccountName} numberOfLines={1}>
                {schoolName || "JSS Elimu Academy"}
              </Text>
            </View>

            <View style={styles.credentialsGrid}>
              {/* Paybill Number Box */}
              <View style={[styles.credentialBox, isDark && styles.credentialBoxDark]}>
                <View style={styles.credLabelRow}>
                  <Text style={styles.credentialLabel}>PAYBILL NUMBER</Text>
                  {copiedField === "paybill" ? (
                    <View style={styles.copiedBadge}>
                      <Ionicons name="checkmark" size={11} color="#16A34A" />
                      <Text style={styles.copiedBadgeText}>Copied!</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={[styles.credentialValue, isDark && styles.textLight]}>
                  {officialPaybill}
                </Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.copyButton,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => handleCopy("paybill")}
                >
                  <Ionicons
                    name="copy-outline"
                    size={14}
                    color={AppTheme.colors.primaryLight}
                  />
                  <Text style={styles.copyButtonText}>Copy Paybill</Text>
                </Pressable>
              </View>

              {/* Account Number Box */}
              <View style={[styles.credentialBox, isDark && styles.credentialBoxDark]}>
                <View style={styles.credLabelRow}>
                  <Text style={styles.credentialLabel}>ACCOUNT NUMBER</Text>
                  {copiedField === "account" ? (
                    <View style={styles.copiedBadge}>
                      <Ionicons name="checkmark" size={11} color="#16A34A" />
                      <Text style={styles.copiedBadgeText}>Copied!</Text>
                    </View>
                  ) : null}
                </View>
                <Text
                  style={[styles.credentialValue, isDark && styles.textLight]}
                  numberOfLines={1}
                >
                  {defaultAccount}
                </Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.copyButton,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => handleCopy("account")}
                >
                  <Ionicons
                    name="copy-outline"
                    size={14}
                    color={AppTheme.colors.primaryLight}
                  />
                  <Text style={styles.copyButtonText}>Copy Account</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.paybillNoteRow}>
              <Ionicons
                name="information-circle"
                size={16}
                color={AppTheme.colors.primaryLight}
              />
              <Text style={styles.paybillNoteText}>
                Use your Admission Number as the Account Number for instant automatic clearance.
              </Text>
            </View>
          </View>

          {/* Segmented Tab Bar */}
          <View style={[styles.tabBar, isDark && styles.tabBarDark]}>
            <Pressable
              style={[
                styles.tabItem,
                activeTab === "stk" && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab("stk")}
            >
              <Ionicons
                name="flash"
                size={15}
                color={
                  activeTab === "stk" ? AppTheme.colors.primaryLight : "#64748B"
                }
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === "stk" && styles.tabLabelActive,
                ]}
              >
                STK Push
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabItem,
                activeTab === "manual" && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab("manual")}
            >
              <Ionicons
                name="list"
                size={15}
                color={
                  activeTab === "manual"
                    ? AppTheme.colors.primaryLight
                    : "#64748B"
                }
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === "manual" && styles.tabLabelActive,
                ]}
              >
                Paybill Steps
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.tabItem,
                activeTab === "history" && styles.tabItemActive,
              ]}
              onPress={() => setActiveTab("history")}
            >
              <Ionicons
                name="receipt-outline"
                size={15}
                color={
                  activeTab === "history"
                    ? AppTheme.colors.primaryLight
                    : "#64748B"
                }
              />
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === "history" && styles.tabLabelActive,
                ]}
              >
                Receipts
              </Text>
            </Pressable>
          </View>

          {/* TAB 1: STK Push Mode */}
          {activeTab === "stk" && (
            <View style={[styles.card, isDark && styles.cardDark]}>
              <View style={styles.sectionHeaderRow}>
                <View>
                  <Text style={[styles.formHeading, isDark && styles.textLight]}>
                    Lipa na M-PESA Express
                  </Text>
                  <Text style={styles.formSubheading}>
                    Receive an instant PIN prompt on your registered mobile number.
                  </Text>
                </View>
                <View style={styles.liveTag}>
                  <View style={styles.liveDot} />
                  <Text style={styles.liveTagText}>Instant</Text>
                </View>
              </View>

              {/* Amount Quick Presets */}
              <Text style={styles.inputLabel}>Select Amount to Pay</Text>
              <View style={styles.presetsRow}>
                {["5000", "10000", "15000"].map((preset) => {
                  const isSelected = selectedPreset === preset;
                  return (
                    <Pressable
                      key={preset}
                      style={[
                        styles.presetChip,
                        isDark && styles.presetChipDark,
                        isSelected && styles.presetChipSelected,
                      ]}
                      onPress={() => handleSelectPreset(preset)}
                    >
                      <Text
                        style={[
                          styles.presetChipText,
                          isSelected && styles.presetChipTextSelected,
                        ]}
                      >
                        KES {Number(preset).toLocaleString()}
                        {preset === "15000" ? " (Full)" : ""}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Amount Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Amount (KES)</Text>
                <TextInput
                  mode="outlined"
                  value={amount}
                  onChangeText={(val) => {
                    setAmount(val);
                    setSelectedPreset("");
                  }}
                  keyboardType="numeric"
                  placeholder="e.g. 15000"
                  left={<TextInput.Affix text="KES " />}
                  outlineColor={AppTheme.colors.borderStrong}
                  activeOutlineColor={AppTheme.colors.primaryLight}
                  textColor={isDark ? "#F8FAFC" : AppTheme.colors.text}
                  style={styles.paperInput}
                  theme={{
                    roundness: AppTheme.roundness.md,
                    colors: {
                      background: isDark ? "#1E293B" : "#FFFFFF",
                    },
                  }}
                />
              </View>

              {/* Phone Number Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>M-PESA Phone Number</Text>
                <TextInput
                  mode="outlined"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder="07XX XXX XXX"
                  left={
                    <TextInput.Icon
                      icon="cellphone"
                      color={AppTheme.colors.primaryLight}
                    />
                  }
                  outlineColor={AppTheme.colors.borderStrong}
                  activeOutlineColor={AppTheme.colors.primaryLight}
                  textColor={isDark ? "#F8FAFC" : AppTheme.colors.text}
                  style={styles.paperInput}
                  theme={{
                    roundness: AppTheme.roundness.md,
                    colors: {
                      background: isDark ? "#1E293B" : "#FFFFFF",
                    },
                  }}
                />
                <HelperText type="info" visible={true} style={styles.helperText}>
                  A payment prompt with PIN confirmation will pop up on this phone.
                </HelperText>
              </View>

              {/* Account Number Reference (Read-only or editable) */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Account Number</Text>
                <TextInput
                  mode="outlined"
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  placeholder="Enter admission number"
                  left={
                    <TextInput.Icon
                      icon="badge-account-outline"
                      color={AppTheme.colors.primaryLight}
                    />
                  }
                  outlineColor={AppTheme.colors.borderStrong}
                  activeOutlineColor={AppTheme.colors.primaryLight}
                  textColor={isDark ? "#F8FAFC" : AppTheme.colors.text}
                  style={styles.paperInput}
                  theme={{
                    roundness: AppTheme.roundness.md,
                    colors: {
                      background: isDark ? "#1E293B" : "#FFFFFF",
                    },
                  }}
                />
                <HelperText type="info" visible={true} style={styles.helperText}>
                  Pre-filled with your student admission number.
                </HelperText>
              </View>

              {/* Paybill Number (Display) */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Business Paybill Number</Text>
                <TextInput
                  mode="outlined"
                  value={officialPaybill}
                  editable={false}
                  left={
                    <TextInput.Icon
                      icon="domain"
                      color={AppTheme.colors.primaryLight}
                    />
                  }
                  right={
                    <TextInput.Icon
                      icon="lock-outline"
                      color={AppTheme.colors.textMuted}
                    />
                  }
                  outlineColor={AppTheme.colors.borderStrong}
                  textColor={isDark ? "#94A3B8" : "#64748B"}
                  style={[styles.paperInput, { backgroundColor: isDark ? "#0F172A" : "#F1F5F9" }]}
                  theme={{
                    roundness: AppTheme.roundness.md,
                    colors: {
                      background: isDark ? "#0F172A" : "#F1F5F9",
                    },
                  }}
                />
              </View>

              {/* Pay Now Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.payNowButton,
                  isSubmitting && { opacity: 0.7 },
                  pressed && { opacity: 0.9 },
                ]}
                onPress={handleInitiateSTK}
                disabled={isSubmitting}
              >
                <LinearGradient
                  colors={["#16A34A", "#15803D"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.payNowGradient}
                >
                  <MaterialCommunityIcons
                    name="cellphone-wireless"
                    size={22}
                    color="#FFFFFF"
                  />
                  <Text style={styles.payNowButtonText}>
                    {isSubmitting
                      ? "Sending STK Prompt..."
                      : `Send M-PESA STK Prompt (KES ${Number(
                          amount || 0
                        ).toLocaleString()})`}
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          )}

          {/* TAB 2: Manual Paybill Steps */}
          {activeTab === "manual" && (
            <View style={[styles.card, isDark && styles.cardDark]}>
              <Text style={[styles.formHeading, isDark && styles.textLight]}>
                Step-by-Step Paybill Guide
              </Text>
              <Text style={styles.formSubheading}>
                How to pay school fees manually via your phone's SIM ToolKit or Safaricom App.
              </Text>

              {/* Step list */}
              <View style={styles.stepsList}>
                <View style={[styles.stepItem, isDark && styles.stepItemDark]}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, isDark && styles.textLight]}>
                      Open M-PESA Menu
                    </Text>
                    <Text style={styles.stepDescription}>
                      On your phone, open Safaricom SIM Toolkit or the M-PESA App.
                    </Text>
                  </View>
                </View>

                <View style={[styles.stepItem, isDark && styles.stepItemDark]}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, isDark && styles.textLight]}>
                      Select Lipa na M-PESA
                    </Text>
                    <Text style={styles.stepDescription}>
                      Navigate to Lipa na M-PESA and select the **Paybill** option.
                    </Text>
                  </View>
                </View>

                <View style={[styles.stepItem, isDark && styles.stepItemDark]}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, isDark && styles.textLight]}>
                      Enter Business No.
                    </Text>
                    <Text style={styles.stepDescription}>
                      Enter Business Number: <Text style={styles.highlightText}>{officialPaybill}</Text>
                    </Text>
                  </View>
                </View>

                <View style={[styles.stepItem, isDark && styles.stepItemDark]}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>4</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, isDark && styles.textLight]}>
                      Enter Account No.
                    </Text>
                    <Text style={styles.stepDescription}>
                      Enter Account Number: <Text style={styles.highlightText}>{defaultAccount}</Text> (Student Admission Number)
                    </Text>
                  </View>
                </View>

                <View style={[styles.stepItem, isDark && styles.stepItemDark]}>
                  <View style={styles.stepNumberBadge}>
                    <Text style={styles.stepNumberText}>5</Text>
                  </View>
                  <View style={styles.stepContent}>
                    <Text style={[styles.stepTitle, isDark && styles.textLight]}>
                      Enter Amount & PIN
                    </Text>
                    <Text style={styles.stepDescription}>
                      Enter the fee amount to pay, followed by your 4-digit secret M-PESA PIN, and confirm.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Verification Submission Form */}
              <View style={[styles.verifyBox, isDark && styles.verifyBoxDark]}>
                <Text style={[styles.verifyBoxTitle, isDark && styles.textLight]}>
                  Already Paid via Paybill?
                </Text>
                <Text style={styles.verifyBoxSubtitle}>
                  Enter the Safaricom confirmation code to verify your receipt.
                </Text>

                {verifySuccess ? (
                  <View style={{ marginVertical: 8 }}>
                    <SuccessMessageBox
                      message="Transaction submitted! The bursar office will reconcile and credit your student ledger within 15 minutes."
                    />
                  </View>
                ) : null}

                <View style={styles.verifyInputRow}>
                  <TextInput
                    mode="outlined"
                    placeholder="e.g. QKH71890XP"
                    value={mPesaCode}
                    onChangeText={setMPesaCode}
                    autoCapitalize="characters"
                    outlineColor={AppTheme.colors.borderStrong}
                    activeOutlineColor={AppTheme.colors.primaryLight}
                    textColor={isDark ? "#F8FAFC" : AppTheme.colors.text}
                    style={[styles.paperInput, { flex: 1 }]}
                    theme={{
                      roundness: AppTheme.roundness.md,
                      colors: {
                        background: isDark ? "#1E293B" : "#FFFFFF",
                      },
                    }}
                  />
                  <Pressable
                    style={({ pressed }) => [
                      styles.verifySubmitBtn,
                      pressed && { opacity: 0.8 },
                    ]}
                    onPress={handleSubmitCode}
                  >
                    <Text style={styles.verifySubmitBtnText}>Verify</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}

          {/* TAB 3: Payment History & Receipts */}
          {activeTab === "history" && (
            <View style={[styles.card, isDark && styles.cardDark]}>
              <View style={styles.sectionHeaderRow}>
                <View>
                  <Text style={[styles.formHeading, isDark && styles.textLight]}>
                    Payment Ledger & Receipts
                  </Text>
                  <Text style={styles.formSubheading}>
                    Official cleared fee installments for academic year 2024.
                  </Text>
                </View>
                <Ionicons
                  name="shield-checkmark"
                  size={20}
                  color={AppTheme.colors.success}
                />
              </View>

              <View style={styles.receiptsList}>
                {pastReceipts.map((rec) => (
                  <View
                    key={rec.id}
                    style={[styles.receiptItem, isDark && styles.receiptItemDark]}
                  >
                    <View style={styles.receiptTop}>
                      <View style={styles.receiptInfoLeft}>
                        <View style={styles.receiptIconCircle}>
                          <Ionicons
                            name="receipt"
                            size={18}
                            color={AppTheme.colors.primaryLight}
                          />
                        </View>
                        <View>
                          <Text
                            style={[
                              styles.receiptTitle,
                              isDark && styles.textLight,
                            ]}
                          >
                            {rec.title}
                          </Text>
                          <Text style={styles.receiptDate}>{rec.date}</Text>
                        </View>
                      </View>

                      <Text style={styles.receiptAmount}>{rec.amount}</Text>
                    </View>

                    <View style={styles.receiptBottom}>
                      <View style={styles.receiptCodePill}>
                        <Text style={styles.receiptCodeText}>
                          Ref: {rec.code}
                        </Text>
                      </View>
                      <View style={styles.receiptStatusBadge}>
                        <Ionicons
                          name="checkmark-circle"
                          size={12}
                          color="#16A34A"
                        />
                        <Text style={styles.receiptStatusText}>
                          {rec.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.downloadStatementBtn,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={() =>
                  Alert.alert(
                    "Fee Statement",
                    "A PDF copy of the fee statement has been generated and sent to the student's registered email address."
                  )
                }
              >
                <Ionicons
                  name="cloud-download-outline"
                  size={18}
                  color={AppTheme.colors.primaryLight}
                />
                <Text style={styles.downloadStatementText}>
                  Download Official Fee Statement (PDF)
                </Text>
              </Pressable>
            </View>
          )}

          {/* Bursar & Support Contact Footer */}
          <View style={[styles.supportCard, isDark && styles.cardDark]}>
            <View style={styles.supportHeader}>
              <FontAwesome6
                name="headset"
                size={18}
                color={AppTheme.colors.primaryLight}
              />
              <Text style={[styles.supportTitle, isDark && styles.textLight]}>
                Bursar Office & Billing Help
              </Text>
            </View>
            <Text style={styles.supportDesc}>
              For cheque clearance, bank slips, or bursary scholarship allocation,
              please visit the school accounts office during regular hours (Mon - Fri:
              8:00 AM - 4:30 PM).
            </Text>
            <View style={styles.supportContactsRow}>
              <View style={styles.contactItem}>
                <Ionicons
                  name="call-outline"
                  size={14}
                  color={AppTheme.colors.textMuted}
                />
                <Text style={styles.contactText}>+254 700 123 456</Text>
              </View>
              <View style={styles.contactItem}>
                <Ionicons
                  name="mail-outline"
                  size={14}
                  color={AppTheme.colors.textMuted}
                />
                <Text style={styles.contactText}>bursar@jssportal.ac.ke</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Simulated STK Push Confirmation Modal */}
      <Modal
        visible={stkModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setStkModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalCard, isDark && styles.modalCardDark]}
          >
            <View style={styles.modalIconCircle}>
              <MaterialCommunityIcons
                name="cellphone-check"
                size={38}
                color="#16A34A"
              />
            </View>

            <Text style={[styles.modalTitle, isDark && styles.textLight]}>
              M-PESA STK Prompt Sent!
            </Text>
            <Text style={styles.modalSubtitle}>
              A payment prompt has been sent to{" "}
              <Text style={{ fontWeight: "700", color: "#16A34A" }}>
                {phoneNumber}
              </Text>
              .
            </Text>

            <View style={styles.modalDetailBox}>
              <View style={styles.modalDetailRow}>
                <Text style={styles.modalDetailLabel}>Business Paybill:</Text>
                <Text style={styles.modalDetailValue}>{officialPaybill}</Text>
              </View>
              <View style={styles.modalDetailRow}>
                <Text style={styles.modalDetailLabel}>Account Number:</Text>
                <Text style={styles.modalDetailValue}>{accountNumber}</Text>
              </View>
              <View style={styles.modalDetailRow}>
                <Text style={styles.modalDetailLabel}>Amount:</Text>
                <Text
                  style={[
                    styles.modalDetailValue,
                    { color: "#16A34A", fontWeight: "800" },
                  ]}
                >
                  KES {Number(amount || 0).toLocaleString()}
                </Text>
              </View>
            </View>

            <Text style={styles.modalInstruction}>
              Please check your phone screen and enter your 4-digit M-PESA PIN to complete the transaction.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.modalDoneButton,
                pressed && { opacity: 0.85 },
              ]}
              onPress={() => setStkModalVisible(false)}
            >
              <Text style={styles.modalDoneText}>Done / Understood</Text>
            </Pressable>
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
    paddingBottom: 22,
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
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#BFDBFE",
    fontWeight: "500",
    marginTop: 1,
  },
  secureBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: AppTheme.roundness.full,
    gap: 4,
  },
  secureBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.lg,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
  },
  summaryCardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
  },
  summaryTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  studentInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  studentIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: AppTheme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  studentName: {
    fontSize: 15,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  studentAdm: {
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
  summaryDivider: {
    height: 1,
    backgroundColor: AppTheme.colors.border,
    marginVertical: 12,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: AppTheme.colors.textSecondary,
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#DC2626",
    marginTop: 2,
  },
  balanceStatsRight: {
    alignItems: "flex-end",
    gap: 2,
  },
  subStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  subStatLabel: {
    fontSize: 11,
    color: AppTheme.colors.textSecondary,
  },
  subStatValue: {
    fontSize: 12,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollArea: {
    flex: 1,
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
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
  },
  paybillHeroCard: {
    borderWidth: 1.5,
    borderColor: "#22C55E",
    backgroundColor: "#F0FDF4",
  },
  paybillHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  mpesaBadge: {
    backgroundColor: "#16A34A",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: AppTheme.roundness.full,
  },
  mpesaBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  schoolAccountName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#166534",
  },
  credentialsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  credentialBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.md,
    padding: 12,
    borderWidth: 1.5,
    borderColor: "#86EFAC",
  },
  credentialBoxDark: {
    backgroundColor: "#0F172A",
    borderColor: "#166534",
  },
  credLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  credentialLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: AppTheme.colors.textSecondary,
    letterSpacing: 0.5,
  },
  copiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  copiedBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#16A34A",
  },
  credentialValue: {
    fontSize: 18,
    fontWeight: "800",
    color: AppTheme.colors.text,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: AppTheme.colors.primarySoft,
    borderRadius: AppTheme.roundness.sm,
    alignSelf: "flex-start",
  },
  copyButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: AppTheme.colors.primaryLight,
  },
  paybillNoteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#DCFCE7",
  },
  paybillNoteText: {
    fontSize: 12,
    color: "#166534",
    flex: 1,
    lineHeight: 16,
    fontWeight: "500",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#E2E8F0",
    borderRadius: AppTheme.roundness.md,
    padding: 4,
  },
  tabBarDark: {
    backgroundColor: "#1E293B",
  },
  tabItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: AppTheme.roundness.sm,
    gap: 6,
  },
  tabItemActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  tabLabelActive: {
    color: AppTheme.colors.primaryLight,
    fontWeight: "700",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  formHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  formSubheading: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
    maxWidth: 240,
  },
  liveTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: AppTheme.roundness.full,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16A34A",
  },
  liveTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#15803D",
  },
  presetsRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  presetChip: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderRadius: AppTheme.roundness.md,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
  },
  presetChipDark: {
    backgroundColor: "#0F172A",
    borderColor: "#334155",
  },
  presetChipSelected: {
    backgroundColor: AppTheme.colors.primarySoft,
    borderColor: AppTheme.colors.primaryLight,
  },
  presetChipText: {
    fontSize: 11,
    fontWeight: "600",
    color: AppTheme.colors.textSecondary,
    textAlign: "center",
  },
  presetChipTextSelected: {
    color: AppTheme.colors.primary,
    fontWeight: "700",
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: AppTheme.colors.textSecondary,
    marginBottom: 6,
    marginLeft: 2,
  },
  paperInput: {
    backgroundColor: "#FFFFFF",
    fontSize: 14,
  },
  helperText: {
    paddingHorizontal: 4,
    marginTop: 2,
    fontSize: 11,
  },
  payNowButton: {
    marginTop: 10,
    borderRadius: AppTheme.roundness.md,
    overflow: "hidden",
    shadowColor: "#16A34A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  payNowGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 10,
  },
  payNowButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  stepsList: {
    gap: 14,
    marginTop: 12,
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
    borderRadius: AppTheme.roundness.md,
    padding: 12,
  },
  stepItemDark: {
    backgroundColor: "#0F172A",
    borderColor: "#475569",
  },
  stepNumberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: AppTheme.colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  stepDescription: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
  highlightText: {
    fontWeight: "700",
    color: AppTheme.colors.primaryLight,
  },
  verifyBox: {
    backgroundColor: "#F8FAFC",
    borderRadius: AppTheme.roundness.md,
    padding: 14,
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
  },
  verifyBoxDark: {
    backgroundColor: "#0F172A",
    borderColor: "#475569",
  },
  verifyBoxTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  verifyBoxSubtitle: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    marginTop: 2,
    marginBottom: 10,
  },
  verifyInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  verifySubmitBtn: {
    backgroundColor: AppTheme.colors.primaryLight,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: AppTheme.roundness.md,
    alignItems: "center",
    justifyContent: "center",
  },
  verifySubmitBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  receiptsList: {
    gap: 10,
    marginBottom: 16,
  },
  receiptItem: {
    backgroundColor: "#F8FAFC",
    borderRadius: AppTheme.roundness.md,
    padding: 12,
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
  },
  receiptItemDark: {
    backgroundColor: "#0F172A",
    borderColor: "#475569",
  },
  receiptTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  receiptInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  receiptIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: AppTheme.colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  receiptTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  receiptDate: {
    fontSize: 11,
    color: AppTheme.colors.textMuted,
    marginTop: 1,
  },
  receiptAmount: {
    fontSize: 14,
    fontWeight: "800",
    color: "#16A34A",
  },
  receiptBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: AppTheme.colors.border,
  },
  receiptCodePill: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: AppTheme.roundness.sm,
  },
  receiptCodeText: {
    fontSize: 11,
    color: AppTheme.colors.textSecondary,
    fontWeight: "600",
  },
  receiptStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  receiptStatusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#16A34A",
  },
  downloadStatementBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: AppTheme.colors.primaryLight,
    borderRadius: AppTheme.roundness.md,
    gap: 8,
    backgroundColor: AppTheme.colors.primarySoft,
  },
  downloadStatementText: {
    fontSize: 13,
    fontWeight: "700",
    color: AppTheme.colors.primary,
  },
  supportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.lg,
    padding: 16,
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
  },
  supportHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  supportTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  supportDesc: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    lineHeight: 17,
  },
  supportContactsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 10,
    flexWrap: "wrap",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  contactText: {
    fontSize: 11,
    fontWeight: "600",
    color: AppTheme.colors.textSecondary,
  },
  textLight: {
    color: "#F8FAFC",
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
    padding: 24,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: AppTheme.colors.borderStrong,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  modalCardDark: {
    backgroundColor: "#1E293B",
    borderColor: "#475569",
  },
  modalIconCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: AppTheme.colors.text,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 13,
    color: AppTheme.colors.textSecondary,
    textAlign: "center",
    marginTop: 6,
  },
  modalDetailBox: {
    width: "100%",
    backgroundColor: "#F8FAFC",
    borderRadius: AppTheme.roundness.md,
    padding: 14,
    marginVertical: 14,
    gap: 8,
  },
  modalDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalDetailLabel: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    fontWeight: "500",
  },
  modalDetailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: AppTheme.colors.text,
  },
  modalInstruction: {
    fontSize: 12,
    color: AppTheme.colors.textSecondary,
    textAlign: "center",
    lineHeight: 17,
    marginBottom: 18,
  },
  modalDoneButton: {
    width: "100%",
    backgroundColor: AppTheme.colors.primaryLight,
    paddingVertical: 14,
    borderRadius: AppTheme.roundness.md,
    alignItems: "center",
    justifyContent: "center",
  },
  modalDoneText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
