import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useAppContext } from "./AuthProviderApi";

export default function DropdownComp() {
  const { setSelectedRole } = useAppContext();
  const users = [
    {
      label: "Student",
      value: "student",
    },
    {
      label: "Teacher",
      value: "teacher",
    },
    {
      label: "Parent/Guardian",
      value: "parent",
    },
  ];

  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      containerStyle={styles.dropdownContainer}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={users}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select Role"
      //searchPlaceholder="Search..."
      value={value} //holds the current selected state value
      onChange={(data) => {
        setValue(data.value);
        setSelectedRole(data.value);
        console.log(data.value);
      }}
      renderRightIcon={() => (
        <Ionicons
          style={styles.icon}
          color="white"
          name="chevron-down"
          size={20}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 4,
    height: 45,
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    marginTop: 4,
    overflow: "hidden",
  },
  icon: {
    marginRight: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "silver",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 22,
    height: 22,
    tintColor: "white",
  },
  inputSearchStyle: {
    height: 44,
    fontSize: 16,
    borderRadius: 8,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },
});
