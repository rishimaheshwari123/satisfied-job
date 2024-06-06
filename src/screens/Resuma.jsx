import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ResumeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  // Add more styles as needed
});

export default ResumeScreen;
