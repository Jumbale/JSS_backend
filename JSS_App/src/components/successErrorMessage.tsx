import { StyleSheet, Text, View } from "react-native";

interface Message {
  message: string;
}

export default function SuccessMessageBox() {}

export function ErrorMessageBox({ message }: Message) {
  return (
    <View style={styles.errorMessageBox}>
      <Text style={{ color: "white" }}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessageBox: {
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 20,
  },
});
