import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicatorBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
// import Checkbox from "expo-checkbox"
import Button from "../component/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginEmployee } from "../redux/action/employeeAction";
import { setError } from "../redux/sclice/employeeSclice";
import {
  getToken,
  config,
  setToken,
  clearToken,
} from "../constants/handelToken";
import Loading from "../component/Loading";

const Login = ({ navigation, route }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const { setUserLoggedIn, setEmployeeLoggedIn } = route.params;

  const { employee, error, loading } = useSelector((e) => e.employee);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const handleSignIn = () => {
    if (!userData.email || !userData.password) {
      ToastAndroid.show(
        "Please fill out all required fields.",
        ToastAndroid.SHORT
      );

      return;
    }
    dispatch(loginEmployee(userData));
  };

  useEffect(() => {
    if (employee) {
      setEmployeeLoggedIn(true);
    }
  }, [employee]);

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
        <View style={{ flex: 1, marginHorizontal: 22 }}>
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
              Hii Welcome Back ! 👋
            </Text>

            <Text
              style={{
                fontSize: 14,
              }}
              className="text-[#99A2B4]"
            >
              Hello again you have been missed! Student
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
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

          <View style={{ marginBottom: 12 }}>
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

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          ></View>

          <Button
            title="Login"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={handleSignIn}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Don't have an account ?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("Register Employee")}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#008BDC",
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;
