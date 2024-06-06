import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import Button from "../component/Button";

const Welcome = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    StatusBar.setBackgroundColor("#4080ED");
    const timer = setTimeout(() => {
      const nextIndex = (currentImageIndex + 1) % data.length;
      setCurrentImageIndex(nextIndex);
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  const renderItem = (image) => (
    <Image
      source={image}
      style={{
        width: Dimensions.get("window").width - 40,
        height: 150,
        borderRadius: 10,
        marginRight: 10,
      }}
    />
  );

  const data = [
    require("../../assets/Images/NA_October_10.jpg"),
    require("../../assets/Images/w2.jpg"),
    require("../../assets/Images/w3.jpg"),
    // Add more images as required
  ];

  return (
    <LinearGradient colors={["#4080ED", "#6D91F7"]} style={{ flex: 1 }}>
      <View
        className="flex items-start py-[20px] justify-between "
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View
          className="space-x-2"
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            marginLeft: 10,
          }}
        >
          <Image
            source={require("../../assets/Icons/logo.png")}
            style={{ height: 35, width: 35, borderRadius: 100 }}
          />
          <Text
            style={{ fontSize: 20, color: COLORS.white, fontWeight: "bold" }}
          >
            Satisfied Jobs
          </Text>
        </View>

        {/* Image */}
        <View style={{ marginTop: 20, paddingLeft: 20 }}>
          {renderItem(data[currentImageIndex])}
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 22, marginTop: 20 }}>
          <Text
            style={{ fontSize: 50, fontWeight: "800", color: COLORS.white }}
          >
            Let's Get
          </Text>
          <Text
            style={{ fontSize: 46, fontWeight: "800", color: COLORS.white }}
          >
            Started
          </Text>

          <View style={{ marginVertical: 22 }}>
            <Text style={{ fontSize: 16, color: COLORS.white }}>
              We Can Help You Succeed! Work Freely and Effectively to Achieve
              Success
            </Text>
          </View>

          <View style={{ flexDirection: "row", marginBottom: 12 }}>
            <Button
              title="Find Job"
              onPress={() =>
                navigation.navigate("Login Student", { role: "Student" })
              }
              style={{ marginTop: 5, width: "50%" }}
            />
            <Button
              title="Company"
              onPress={() =>
                navigation.navigate("Login Employee", { role: "Employee" })
              }
              style={{ marginTop: 5, width: "50%" }}
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ fontSize: 16, color: COLORS.white }}>
              Find your dream job on our app
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Welcome;
