import PressableElemet, { Card } from "@/components/PressableElemet";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import StudentLogin from "../ApiServices/StudentLogin";
import { useAppContext } from "../components/AuthProviderApi";
import DropdownComp from "../components/DropdownComp";
import { ErrorMessageBox } from "../components/successErrorMessage";

export default function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const ColorScheme = useColorScheme();
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

  const { selectedRole } = useAppContext();
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");

  const [CheckIsEmpty, setCheckIsEmpty] = useState(false);
  const [error, setError] = useState(false);

  const [fieldEmptyMessageSchool, setFieldEmptyMessageSchool] = useState("");
  const [fieldEmptyMessagePassword, setFieldEmptyMessagePassword] =
    useState("");
  const [fieldEmptyMessageRole, setFieldEmptyMessageRole] = useState("");

  const role = selectedRole;
  //const [role, setRole] = useState("");

  //Login Function
  const triggerLogin = async () => {
    if (!school.trim() || !password.trim() || !role?.trim()) {
      if (!school.trim()) {
        setFieldEmptyMessageSchool("fill this field!");
      } else {
        setFieldEmptyMessageSchool("");
      }
      if (!password.trim()) {
        setFieldEmptyMessagePassword("fill this field!");
      } else {
        setFieldEmptyMessagePassword("");
      }
      if (!role?.trim()) {
        setFieldEmptyMessageRole("fill this field!");
      } else {
        setFieldEmptyMessageRole("");
      }
      //setCheckIsEmpty(true);
      // setFieldEmptyMessage("fill this field!");

      // console.log(school, password, role);
      return;
    }

    const studentsDetails = { school, password, role };

    console.log(studentsDetails);

    const results = await StudentLogin(studentsDetails);

    console.log(results);
    console.log();

    if (results.success === true) {
      router.replace("/Home");
    } else {
      setLoginErrorMessage(results.message);
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const [isSecure, setIsSecure] = useState(true);

  //UI building
  return (
    <SafeAreaView
      //style={
      // [
      style={styles.safeArea}
      // { backgroundColor: ColorScheme === "dark" ? "#000000" : "grey" },
      // ]
      // }
    >
      <LinearGradient
        colors={["silver", "blue"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBox}
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

            <Text style={styles.label}>School</Text>

            <TextInput
              style={[
                styles.field,
                isFocused ? styles.blueBorder : styles.field,
              ]}
              placeholder="Enter Your School"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={school}
              onChangeText={(textInput) => setSchool(textInput)}
            />
            <View>
              <Text style={styles.emptyFieldTextError}>
                {fieldEmptyMessageSchool}
              </Text>
            </View>

            <Text style={styles.label}>Password</Text>

            <View
              style={[
                styles.passwordContainer,
                isFocused2 ? styles.blueBorder : styles.whiteBorder,
              ]}
              onFocus={() => setIsFocused2(true)}
              onBlur={() => {
                setIsFocused2(false);
                // console.log("field not active");
              }}
            >
              <TextInput
                secureTextEntry={isSecure}
                autoCapitalize="none"
                style={[styles.field2]}
                placeholder="Admission Number/Email"
                value={password}
                onChangeText={(passwordText) => {
                  setPassword(passwordText);
                }}
              />
              <Pressable
                onPress={() => {
                  setIsSecure(!isSecure);
                }}
                // style={styles.eyeIcon}
              >
                <Ionicons
                  name={isSecure ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#fff"
                />
              </Pressable>
            </View>
            <View>
              <Text style={styles.emptyFieldTextError}>
                {fieldEmptyMessagePassword}
              </Text>
            </View>
            <Text style={styles.label}>Role</Text>
            <DropdownComp />
            <View>
              <Text style={styles.emptyFieldTextError}>
                {fieldEmptyMessageRole}
              </Text>
            </View>

            <PressableElemet onPress={triggerLogin} />
            <View style={{ alignItems: "center", margin: 5 }}>
              {error ? <ErrorMessageBox message={loginErrorMessage} /> : ""}
            </View>
            <Card />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

//CSS styling

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
    //backgroundColor: "rgba(22,23,124,22)",
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
    borderRadius: 20,
    borderColor: "white",
    width: "100%",
    padding: 12,
  },
  focused: {
    borderColor: "#fff",
  },
  field2: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "transparent",
    width: "90%",
  },
  gradientBox: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  blueBorder: {
    borderColor: "#A8E6CF",
  },
  passwordContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 5,
  },

  whiteBorder: {
    borderColor: "#fff",
  },
  redBorder: {
    borderColor: "red",
  },
  emptyFieldTextError: {
    color: "red",
    marginLeft: 5,
  },
});
