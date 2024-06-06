import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/settings/terms.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Privacy & Policy</Text>
      <Text style={styles.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget felis
        ullamcorper, suscipit turpis vel, congue velit. Vivamus hendrerit quam
        ac eros scelerisque, non blandit neque faucibus. Integer nec mauris nec
        ante congue consequat. Nullam lacinia ultrices nibh sit amet ultrices.
        Aliquam erat volutpat.
      </Text>
      <Text style={styles.paragraph}>
        Fusce convallis mi eu justo faucibus, non malesuada dui viverra. Sed non
        luctus tortor. Vestibulum at pulvinar est. Ut euismod nisl sed sapien
        ultrices aliquam. Ut eget turpis eu ex ultricies tempor. Nam dictum mi a
        est aliquet luctus.
      </Text>
      {/* Add more paragraphs for privacy policy */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 140,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  paragraph: {
    marginBottom: 15,
    lineHeight: 20,
    textAlign: "justify",
    color: "#555",
  },
});

export default PrivacyPolicy;
