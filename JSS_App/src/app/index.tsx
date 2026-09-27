import { ImageBackground } from "expo-image";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { BorderedButton } from "../components/PressableElemet";

export default function index() {
  const colorScheme = useColorScheme();

  return (
    <ImageBackground
      style={styles.container}
      source={require("@/assets/images/studentsInclass.jpeg")}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.details}>
          <Text
            style={[
              styles.welcomeText,
              { color: colorScheme === "dark" ? "white" : "black" },
            ]}
          >
            JSS ElimuApp
          </Text>
          <BorderedButton />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    width: "85%",
    alignContent: "center",
  },
  welcomeText: {
    color: "white",
    fontSize: 35,
    alignSelf: "center",
    paddingBottom: 30,
    fontWeight: "bold",
  },
  dynamic_color: {
    color: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
});
