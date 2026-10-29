import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { AppTheme } from "../constants/theme";
import { useAppContext } from "./AuthProviderApi";

export default function DropdownComp() {
  const { selectedRole, setSelectedRole } = useAppContext();
  const [isFocused, setIsFocused] = useState(false);

  const roles = [
    { label: "Student", value: "student", icon: "school-outline" as const },
    { label: "Teacher", value: "teacher", icon: "person-outline" as const },
    { label: "Parent / Guardian", value: "parent", icon: "people-outline" as const },
  ];

  return (
    <View style={styles.wrapper}>
      <Dropdown
        style={[
          styles.dropdown,
          isFocused && styles.dropdownFocused,
        ]}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.itemContainer}
        data={roles}
        maxHeight={260}
        labelField="label"
        valueField="value"
        placeholder="Select Role"
        value={selectedRole}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(item) => {
          setSelectedRole(item.value);
          setIsFocused(false);
        }}
        renderLeftIcon={() => (
          <Ionicons
            name="person-circle-outline"
            size={22}
            color={AppTheme.colors.primaryLight}
            style={styles.leftIcon}
          />
        )}
        renderRightIcon={() => (
          <Ionicons
            name={isFocused ? "chevron-up" : "chevron-down"}
            size={20}
            color={AppTheme.colors.primaryLight}
          />
        )}
        renderItem={(item) => {
          const isSelected = item.value === selectedRole;
          return (
            <View style={[styles.itemRow, isSelected && styles.itemRowSelected]}>
              <Ionicons
                name={item.icon}
                size={20}
                color={isSelected ? AppTheme.colors.primary : AppTheme.colors.textSecondary}
                style={styles.itemIcon}
              />
              <Text style={[styles.itemLabel, isSelected && styles.itemLabelSelected]}>
                {item.label}
              </Text>
              {isSelected && (
                <Ionicons name="checkmark-sharp" size={18} color={AppTheme.colors.primary} />
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 4,
    width: "100%",
  },
  dropdown: {
    height: 54,
    backgroundColor: "#FFFFFF",
    borderColor: AppTheme.colors.borderStrong,
    borderWidth: 1.5,
    borderRadius: AppTheme.roundness.md,
    paddingHorizontal: 14,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dropdownFocused: {
    borderColor: AppTheme.colors.primaryLight,
    borderWidth: 2,
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: AppTheme.roundness.md,
    borderWidth: 1,
    borderColor: AppTheme.colors.border,
    marginTop: 6,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  leftIcon: {
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 15,
    color: AppTheme.colors.textMuted,
    fontWeight: "400",
  },
  selectedTextStyle: {
    fontSize: 15,
    color: AppTheme.colors.text,
    fontWeight: "600",
  },
  itemContainer: {
    paddingVertical: 2,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemRowSelected: {
    backgroundColor: AppTheme.colors.primarySoft,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemTextStyle: {
    fontSize: 15,
    color: AppTheme.colors.text,
  },
  itemLabel: {
    fontSize: 15,
    color: AppTheme.colors.textSecondary,
    flex: 1,
  },
  itemLabelSelected: {
    color: AppTheme.colors.primary,
    fontWeight: "700",
  },
});
