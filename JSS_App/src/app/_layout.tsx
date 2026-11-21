import { DarkTheme, DefaultTheme, Stack } from "expo-router";
import { ThemeProvider } from "expo-router/build/react-navigation";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppContextProvider } from "../components/AuthProviderApi";
import { AppTheme } from "../constants/theme";

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const paperTheme = isDark
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          primary: AppTheme.colors.primaryLight,
          primaryContainer: "#1E293B",
          background: "#0F172A",
          surface: "#1E293B",
          outline: "#475569",
        },
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: AppTheme.colors.primary,
          primaryContainer: AppTheme.colors.primarySoft,
          background: AppTheme.colors.background,
          surface: AppTheme.colors.surface,
          outline: AppTheme.colors.borderStrong,
        },
      };

  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: AppTheme.colors.primaryLight,
          background: "#0F172A",
          card: "#1E293B",
          text: "#F8FAFC",
          border: "#334155",
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: AppTheme.colors.primary,
          background: AppTheme.colors.background,
          card: "#FFFFFF",
          text: AppTheme.colors.text,
          border: AppTheme.colors.border,
        },
      };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={navTheme}>
          <AppContextProvider>
            <StatusBar style={isDark ? "light" : "dark"} />
            <Stack
              screenOptions={{
                animation: "slide_from_right",
                headerStyle: {
                  backgroundColor: isDark ? "#1E293B" : "#FFFFFF",
                },
                contentStyle: {
                  backgroundColor: isDark ? "#0F172A" : AppTheme.colors.background,
                },
                headerTintColor: isDark ? "#F8FAFC" : AppTheme.colors.text,
                headerTitleStyle: { fontWeight: "700" },
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="Login" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="forgotPassword"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FeePayment"
                options={{ headerShown: false }}
              />
            </Stack>
          </AppContextProvider>
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
