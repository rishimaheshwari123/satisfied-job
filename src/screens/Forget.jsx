import {
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../constants/colors";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Forget = () => {
  useEffect(() => {
    StatusBar.setBackgroundColor("#4080ED");
    StatusBar.setBarStyle("dark-content");
  }, []);

  const [otp, setOtp] = useState(false);

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View className="px-[15px] py-[10px] ">
      <View className="">
        <TouchableOpacity>
          <MaterialIcons  
            onPress={handlePress}
            name="arrow-back-ios"
            size={18}
            color="black"
          />
        </TouchableOpacity>
        <View className="px-[20px] text-center  justify-center h-full space-y-5">
          <View className="space-y-3">
            <Image
              className="w-[180px] h-[140px] mx-auto object-cover"
              source={require("../../assets/Images/otp.png")}
            />

            <View className="space-y-2">
              <Text className="text-center text-[22px] font-semibold text-[#050505]">
                OTP Verification
              </Text>
              <View className="mb-2">
                <View>
                  <Text className="text-center">
                    We will send you an One Time Passcode
                  </Text>
                  <Text className="text-center">vai this email address</Text>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  height: 38,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 10,
                }}
                className="my-2"
              >
                <TextInput
                  placeholder="example@gmail.com"
                  placeholderTextColor={COLORS.black}
                  keyboardType="email-address"
                  //  onChangeText={(text) => handleInputChange("email", text)}
                  style={{
                    width: "100%",
                  }}
                  className="opacity-[0.5]"
                />
              </View>

              <View
                style={{
                  backgroundColor: "#4080ED",
                  width: 140,
                  height: 40,
                  borderRadius: 8,
                  overflow: "hidden",
                }}
                className="flex justify-center rounded-3xl mx-auto items-center text-center"
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                  className="text-center"
                >
                  Send
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Forget;
