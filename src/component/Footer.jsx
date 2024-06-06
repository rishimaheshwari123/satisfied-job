import React from "react";
import { View, Text, Image } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={{ backgroundColor: "#190A28" }}>
      <View
        style={{
          maxWidth: "100%",
          paddingHorizontal: 4,
          paddingVertical: 6,
          marginBottom: 8,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ marginBottom: 6 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Image
                source={require("../../assets/logo.png")}
                style={{ height: "10px", marginRight: 3 }}
              /> */}
              <Text
                style={{ fontSize: 12, fontWeight: "bold", color: "#ffffff" }}
                className="uppercase"
              >
                SATISFIED Job
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "65%",
            }}
          >
            <View style={{ marginBottom: 6 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                Resources
              </Text>
              <View style={{ marginTop: 2 }}>
                <Text style={{ color: "#cccccc", fontWeight: "500" }}>
                  Flowbite
                </Text>
                <Text style={{ color: "#cccccc", fontWeight: "500" }}>
                  Tailwind CSS
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 6 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                Follow us
              </Text>
              <View style={{ marginTop: 2 }}>
                <Text style={{ color: "#cccccc", fontWeight: "500" }}>
                  Github
                </Text>
                <Text style={{ color: "#cccccc", fontWeight: "500" }}>
                  Discord
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: 6 }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  color: "#ffffff",
                  textTransform: "uppercase",
                }}
              >
                Legal
              </Text>
              <View style={{ marginTop: 2 }}>
                <Text style={{ color: "#cccccc", fontWeight: "500" }}>
                  Privacy Policy
                </Text>
                <Text style={{ color: "#cccccc", fontWeight: "500" }}>
                  Terms & Conditions
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: "#e2e8f0",
            borderBottomWidth: 1,
            marginTop: 6,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          <Text style={{ fontSize: 10, color: "#888888" }}>
            © 2023 Flowbite™. All Rights Reserved.
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", marginLeft: 5 }}>
              <AntDesign
                name="facebook-square"
                size={16}
                color="#888888"
                style={{ marginRight: 5 }}
              />
              <Ionicons
                name="logo-twitter"
                size={16}
                color="#888888"
                style={{ marginRight: 5 }}
              />
              <Ionicons
                name="logo-instagram"
                size={16}
                color="#888888"
                style={{ marginRight: 5 }}
              />
              <Ionicons
                name="logo-github"
                size={16}
                color="#888888"
                style={{ marginRight: 5 }}
              />
              <Ionicons name="logo-dribbble" size={16} color="#888888" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Footer;
