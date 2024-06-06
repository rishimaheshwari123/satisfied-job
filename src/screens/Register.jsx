import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../component/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { registerEmployee } from "../redux/action/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../redux/sclice/studentSclice";
import { registerStudent } from "../redux/action/studentAction";
import Loading from "../component/Loading";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ route }) => {
  //student

  const { student, error, loading } = useSelector((e) => e.student);
  const { setUserLoggedIn } = route.params;

  const navigation = useNavigation();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    contact: "",
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleSignUp = () => {
    if (
      !userData.name ||
      !userData.email ||
      !userData.contact ||
      !userData.password
    ) {
      ToastAndroid.show(
        "Please fill out all required fields.",
        ToastAndroid.SHORT
      );
      return;
    }
    dispatch(registerStudent(userData));
  };

  useEffect(() => {
    const getTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("OTP Student");
      }
    };
    getTokenAndNavigate();
  }, [handleSignUp]);

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch(setError(null));
    }
  }, [error]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          style={{ flex: 1, marginHorizontal: 22 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginVertical: 22 }}>
            <Image
              source={require("../../assets/Icons/logo.png")}
              className="w-[90px] h-[90px] my-[20px] mx-auto rounded-full"
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginVertical: 8,
                color: COLORS.black,
              }}
              className="mx-auto"
            >
              👋Create you profile
            </Text>

            <Text
              style={{
                fontSize: 14,
              }}
              className="text-[#99A2B4] mx-auto"
            >
              We can help you Succeed
            </Text>
          </View>

          <View style={{ marginBottom: 3 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                marginVertical: 8,
              }}
              className="text-[#2980FF]"
            >
              Name
            </Text>

            <View
              style={{
                width: "100%",
                height: 35,
                borderColor: COLORS.black,
                borderBottomWidth: 0.5,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={COLORS.black}
                keyboardType="text"
                onChangeText={(text) => handleInputChange("name", text)}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 3 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                marginVertical: 8,
              }}
              className="text-[#2980FF]"
            >
              Email address
            </Text>

            <View
              style={{
                width: "100%",
                height: 35,
                borderColor: COLORS.black,
                borderBottomWidth: 0.5,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                onChangeText={(text) => handleInputChange("email", text)}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 3 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                marginVertical: 8,
              }}
              className="text-[#2980FF]"
            >
              contact
            </Text>

            <View
              style={{
                width: "100%",
                height: 35,
                borderColor: COLORS.black,
                borderBottomWidth: 0.5,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Enter your contact"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("contact", text)}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 3 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                marginVertical: 8,
              }}
              className="text-[#2980FF]"
            >
              city
            </Text>

            <View
              style={{
                width: "100%",
                height: 35,
                borderColor: COLORS.black,
                borderBottomWidth: 0.5,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Enter your city"
                placeholderTextColor={COLORS.black}
                keyboardType="text"
                onChangeText={(text) => handleInputChange("city", text)}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 3 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 400,
                marginVertical: 8,
              }}
              className="text-[#2980FF]"
            >
              Password
            </Text>

            <View
              style={{
                width: "100%",
                height: 35,
                borderColor: COLORS.black,
                borderBottomWidth: 0.5,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                onChangeText={(text) => handleInputChange("password", text)}
                style={{
                  width: "100%",
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Button
              title="Sign Up"
              filled
              style={{
                marginTop: 18,
                marginBottom: 4,
              }}
              onPress={handleSignUp}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("Login Student")}
              className="flex flex-row gap-1"
              style={{ fontSize: 14 }}
            >
              <Text>Already have an Account</Text>
              <Text className="text-[#008BDC]">Login</Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
          </View>

         
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Register;
