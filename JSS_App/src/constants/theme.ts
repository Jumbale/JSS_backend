/**
 * Standard theme configuration and styling constants for JSS ElimuApp.
 * Built using standard React Native styling (StyleSheet), without Tailwind CSS.
 */

import { Platform } from 'react-native';

export const AppTheme = {
  colors: {
    primary: '#1E40AF',       // Deep royal blue
    primaryDark: '#1E3A8A',   // Navy blue
    primaryLight: '#3B82F6',  // Bright electric blue
    primarySoft: '#EFF6FF',   // Subtle soft blue tint
    accent: '#0284C7',        // Sky blue accent
    success: '#10B981',       // Emerald green (fees/paid)
    successSoft: '#ECFDF5',   // Emerald light tint
    warning: '#F59E0B',       // Amber/Orange (attendance/pending)
    warningSoft: '#FFFBEB',   // Amber light tint
    error: '#EF4444',         // Red error
    errorSoft: '#FEF2F2',     // Red light tint
    purple: '#8B5CF6',        // Subject violet
    purpleSoft: '#F5F3FF',    // Subject light tint
    background: '#F8FAFC',    // Slate light background
    surface: '#FFFFFF',       // Card / Surface pure white
    border: '#E2E8F0',        // Border slate 200
    borderStrong: '#CBD5E1',  // Border slate 300
    text: '#0F172A',          // Heading / dark slate
    textSecondary: '#475569', // Body / slate 600
    textMuted: '#94A3B8',     // Subtle / slate 400
    textLight: '#FFFFFF',     // White text
    overlay: 'rgba(15, 23, 42, 0.65)',
  },
  roundness: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#1E40AF',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export const Colors = {
  light: {
    text: '#0F172A',
    background: '#F8FAFC',
    backgroundElement: '#F1F5F9',
    backgroundSelected: '#E2E8F0',
    textSecondary: '#64748B',
  },
  dark: {
    text: '#F8FAFC',
    background: '#0F172A',
    backgroundElement: '#1E293B',
    backgroundSelected: '#334155',
    textSecondary: '#94A3B8',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
