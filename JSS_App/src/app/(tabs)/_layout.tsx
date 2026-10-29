import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, useColorScheme } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppTheme } from "../../constants/theme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const activeColor = AppTheme.colors.primaryLight;
  const inactiveColor = isDark ? "#64748B" : "#94A3B8";
  const tabBgColor = isDark ? "#1E293B" : "#FFFFFF";
  const borderColor = isDark ? "#334155" : "#E2E8F0";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarButton: (props) => {
          const { ref, ...restProps } = props as any;
          return (
            <Pressable
              {...restProps}
              android_ripple={{
                color: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(37, 99, 235, 0.1)",
                borderless: true,
                radius:10
              }}
              style={({ pressed }) => [
                restProps.style,
                pressed && Platform.OS === "ios" && { opacity: 0.7 },
              ]}
            >
              {restProps.children}
            </Pressable>
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: -2,
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: tabBgColor,
          borderTopColor: borderColor,
          borderTopWidth: 1,
          height: 60 + (insets.bottom > 0 ? insets.bottom - 4 : 8),
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          shadowColor: "#0F172A",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: isDark ? 0.25 : 0.06,
          shadowRadius: 12,
          elevation: 12,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
