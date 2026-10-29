import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppTheme } from "../constants/theme";

interface MessageProps {
  message: string;
}

export default function SuccessMessageBox({ message }: MessageProps) {
  if (!message) return null;
  return (
    <View style={styles.successContainer}>
      <Ionicons name="checkmark-circle" size={18} color={AppTheme.colors.success} style={styles.icon} />
      <Text style={styles.successText}>{message}</Text>
    </View>
  );
}

export function ErrorMessageBox({ message }: MessageProps) {
  if (!message) return null;
  return (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle" size={18} color={AppTheme.colors.error} style={styles.icon} />
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: AppTheme.roundness.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    width: "100%",
    marginVertical: 6,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderColor: "#86EFAC",
    borderWidth: 1,
    borderRadius: AppTheme.roundness.md,
    paddingVertical: 10,
    paddingHorizontal: 14,
    width: "100%",
    marginVertical: 6,
  },
  successText: {
    color: "#15803D",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
});
