import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';

export default function DropdownComp() {
    const users=[{
        label:"Student", value:"1"
    },{
         label:"Teacher", value:"2"
    },{
         label:"Parent/Guardian", value:"3"
    }];
    
      const [value,setValue]=useState(null);
   

  return (
    <Dropdown
      style={styles.dropdown}
      containerStyle={styles.dropdownContainer}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={users}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select Role"
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} color="black" names="Safety" size={20} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginVertical: 12,        
    height: 52,                
    backgroundColor: 'white',  
    borderColor: 'black',      
    borderWidth: 2,            
    borderRadius: 10,          
    paddingHorizontal: 12,    
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 4,
    overflow: 'hidden',
  },
  icon: {
    marginRight: 8,           
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#aaa',            
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',            
  },
  iconStyle: {
    width: 22,
    height: 22,
    tintColor: 'black',        
  },
  inputSearchStyle: {
    height: 44,
    fontSize: 16,
    borderRadius: 8,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
});