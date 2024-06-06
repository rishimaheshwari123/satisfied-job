import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomInput = ({ label, options, onSelect, selectedValue }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedOption(selectedValue);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowOptions(false);
    onSelect(option); // Notify parent component about the selected option
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text>{selectedOption || `Select a ${label}`}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          {options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(option)}
              style={styles.option}
            >
              <Text className="capitalize">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
    fontWeight: "bold",
    fontStyle: "capital",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingVertical: 12,
    padding: 10,
  },
  optionsContainer: {
    position: "absolute",
    top: "100%",
    width: "100%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    zIndex: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default CustomInput;
