import { DarkTheme, DefaultTheme, Stack } from "expo-router";
import { ThemeProvider } from "expo-router/build/react-navigation";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const lightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#ffffff",
    },
  };
  const darkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#000000",
    },
  };
  return (
    <SafeAreaProvider>
      <ThemeProvider value={isDark ? darkTheme : lightTheme}>
        <Stack
          screenOptions={{
            animation: "slide_from_right",
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
            },
            contentStyle: {
              backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
            },
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="forgotPassword"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
