import { Linking } from "react-native";

const makePhoneCall = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

// Function to send a message
const sendMessage = (message, callerNumber) => {
  Linking.openURL(`sms:${callerNumber}?body=${encodeURIComponent(message)}`);
};

// Function to check if the current time is after 7pm
const isAfter7pm = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  return currentHour > 19; // 19 represents 7pm (24-hour format)
};

// Function to handle incoming calls from students
exports.handleIncomingCall = (callerNumber) => {
  if (callerNumber) {
    // Check for HR calling and night time (after 7pm)
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (currentTime <= 2) {
      sendMessage(
        "HR is not available at the moment. Please try again during business hours.",
        callerNumber
      );
    } else if (isAfter7pm()) {
      sendMessage(
        "We are not available for calls after 7pm. Please try again during business hours.",
        callerNumber
      );
    } else {
      makePhoneCall(callerNumber); // Call if within business hours (before 7pm)
    }
  } else {
    sendMessage(
      "I'm not available right now. Please try again later.",
      callerNumber
    );
  }
};
