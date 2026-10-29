import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BorderedButton } from "../components/PressableElemet";
import { AppTheme } from "../constants/theme";

export default function Index() {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("@/assets/images/studentsInclass.jpeg")}
        contentFit="cover"
      >
        <LinearGradient
          colors={[
            "rgba(15, 23, 42, 0.45)",
            "rgba(15, 23, 42, 0.75)",
            "rgba(15, 23, 42, 0.95)",
          ]}
          locations={[0, 0.5, 1]}
          style={styles.gradientOverlay}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerArea}>
              <View style={styles.logoBadge}>
                <FontAwesome6 name="graduation-cap" size={32} color="#FFFFFF" />
              </View>
              <View style={styles.portalTag}>
                <Ionicons name="sparkles" size={14} color="#FBBF24" />
                <Text style={styles.portalTagText}>CBC Academic Portal</Text>
              </View>
            </View>

            <View style={styles.contentArea}>
              <Text style={styles.title}>JSS ElimuApp</Text>
              <Text style={styles.subtitle}>Junior Secondary School Portal</Text>

              <View style={styles.featureRow}>
                <View style={styles.featurePill}>
                  <Ionicons name="book-outline" size={14} color="#93C5FD" />
                  <Text style={styles.featurePillText}>Academics</Text>
                </View>
                <View style={styles.featurePill}>
                  <Ionicons name="analytics-outline" size={14} color="#93C5FD" />
                  <Text style={styles.featurePillText}>Performance</Text>
                </View>
                <View style={styles.featurePill}>
                  <Ionicons name="receipt-outline" size={14} color="#93C5FD" />
                  <Text style={styles.featurePillText}>Fee Status</Text>
                </View>
              </View>

              <Text style={styles.description}>
                Empowering learners, educators, and guardians with seamless access
                to junior secondary school academic records and assessments.
              </Text>

              <View style={styles.ctaContainer}>
                <BorderedButton />
              </View>

              <Text style={styles.footerNote}>
                Ministry of Education • Competency Based Curriculum (CBC)
              </Text>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFill,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  headerArea: {
    alignItems: "center",
    paddingTop: 24,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(37, 99, 235, 0.85)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: AppTheme.colors.primaryLight,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  portalTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: AppTheme.roundness.full,
    marginTop: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  portalTagText: {
    color: "#F8FAFC",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  contentArea: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#93C5FD",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  featureRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
    marginBottom: 16,
  },
  featurePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30, 58, 138, 0.6)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: AppTheme.roundness.full,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(147, 197, 253, 0.3)",
  },
  featurePillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  description: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    maxWidth: 340,
    marginBottom: 24,
  },
  ctaContainer: {
    width: "100%",
    maxWidth: 320,
  },
  footerNote: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 20,
    textAlign: "center",
  },
});
