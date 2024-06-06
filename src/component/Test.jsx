import React from "react";
import { View, Button, Linking, StyleSheet } from "react-native";

const ContactButton = () => {
  const handleContactPress = () => {
    // Replace '1234567890' with the phone number you want to call
    const phoneNumber = "1234567890";

    const url = `tel:${phoneNumber}`;

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={styles.container}>
      <Button title="T" onPress={handleContactPress} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white", // Set the background color of the container
    padding: 10, // Add padding for better visibility
  },
});

export default ContactButton;
