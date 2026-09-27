import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function index() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          backgroundColor: "orange",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>index</Text>
      </View>
    </SafeAreaView>
  );
}
