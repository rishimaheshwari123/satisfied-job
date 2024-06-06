import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
  },
});

export default function OnboardingScreen({ navigation }) {

  const handleDone = async () => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Error setting onboarding completed status:", error);
    }
  };

  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#4080ED",
          title: "Career Compass",
          subtitle: "Navigate Your Future with Confidence and Ease",
          image: (
            <LottieView
              source={require("../../assets/gfg/g1.json")}
              autoPlay
              loop
              style={{ width: 300, height: 250 }}
            />
          ),
        },
        {
          backgroundColor: "#4080ED",
          title: "Opportunity Hub",
          subtitle: "Unlock Doors to Your Next Professional Adventure",
          image: (
            <LottieView
              source={require("../../assets/gfg/g3.json")}
              autoPlay
              loop
              style={{ width: 300, height: 250 }}
            />
          ),
        },
        {
          backgroundColor: "#4080ED",
          title: "Job Junction",
          subtitle:
            "Connecting Talent with Opportunities Find Your Perfect Fit in the World of Work",
          image: (
            <LottieView
              source={require("../../assets/gfg/g4.json")}
              autoPlay
              loop
              style={{ width: 300, height: 250 }}
            />
          ),
        },
      ]}
      onDone={handleDone}
    />
  );
}
