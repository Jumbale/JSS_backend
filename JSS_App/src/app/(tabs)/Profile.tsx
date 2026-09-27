import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          backgroundColor: "yellow",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Profile</Text>
      </View>
    </SafeAreaView>
  );
}
