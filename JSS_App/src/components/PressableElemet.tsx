import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PressableElemet() {
  const tabsPage = () => {
    router.replace("/Home");
  };
  return (
    <Pressable style={styles.buttonLayout} onPress={tabsPage}>
      <Text style={styles.buttonName}>Sign in</Text>
    </Pressable>
  );
}

export function Card() {
  return (
    <View style={styles.card}>
      <Text style={styles.cardContent}>Not Registered? consult Admin</Text>
      <Link
        href="/forgotPassword"
        style={{
          color: "#93C5FD",
          textDecorationLine: "underline",
          fontSize: 12,
          padding: 4,
        }}
      >
        Forgot password
      </Link>
    </View>
  );
}

export function BorderedButton() {
  const [isActive, setIsActive] = useState(false);
  return (
    <Link href="/Login" asChild>
      <Pressable
        style={StyleSheet.flatten([
          styles.bordered,
          {
            backgroundColor: isActive ? "#03A9F4" : "blue",
            borderColor: isActive ? "grey" : "white",
          },
        ])}
        onPressIn={() => setIsActive(true)}
        onPressOut={() => setIsActive(false)}
      >
        <Text style={styles.borderedText}>Sign in</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  buttonLayout: {
    width: "100%",
    backgroundColor: "#93C5FD",
    borderRadius: 10,
  },
  buttonName: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 8,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    fontSize: 12,
    color: "white",
    padding: 4,
  },
  press: {
    backgroundColor: "white",
  },
  bordered: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 4,
    backgroundColor: "blue",
  },
  borderedText: {
    fontSize: 25,
    color: "white",
    alignSelf: "center",
  },
});
