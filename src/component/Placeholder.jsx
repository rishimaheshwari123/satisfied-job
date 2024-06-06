import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Placeholder = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/gfg/g4.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: Dimensions.get("window").width * 0.8, // 80% of screen width
    height: Dimensions.get("window").height * 0.8, // 80% of screen height
  },
});

export default Placeholder;
