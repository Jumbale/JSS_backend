import PressableElemet, { Card } from "@/components/PressableElemet";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import DropdownComp from "../components/DropdownComp";
export default function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const ColorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: ColorScheme === "dark" ? "#000000" : "grey" },
      ]}
    >
      <View style={styles.container}>
        <Link href=".." asChild>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="white"
            style={{
              position: "absolute",
              top: 16,
              left: 12,
            }}
          />
        </Link>

        <View style={styles.userDetails}>
          <Text style={styles.Text}>Login</Text>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.field, isFocused ? styles.focused : styles.field]}
            placeholder="Enter Your Name"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.field2, isFocused2 ? styles.focused : styles.field2]}
            placeholder="Enter Your Admission Number"
            onFocus={() => setIsFocused2(true)}
            onBlur={() => {
              setIsFocused2(false);
              console.log("field not active");
            }}
          />
          <DropdownComp />
          <PressableElemet />
          <Card />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: "rgba(22,23,24,2)",
  },

  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    backgroundColor: "rgba(22,23,124,22)",
  },
  Text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35,
    alignSelf: "center",
  },
  userDetails: {
    width: "85%",
  },
  label: {
    color: "white",
    fontSize: 15,
    alignSelf: "center",
    padding: 4,
  },
  field: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    width: "100%",
    padding: 12,
  },
  focused: {
    borderColor: "#fff",
  },
  field2: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    width: "100%",
    padding: 12,
  },
});
