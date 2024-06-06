import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  ActivityIndicatorBase,
  StatusBar,
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
import { loginStudent } from "../redux/action/studentAction";
import Loading from "../component/Loading";

const Login = ({ navigation, route }) => {
  const { student, error, loading } = useSelector((e) => e.student);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const { setUserLoggedIn } = route.params;

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
    dispatch(loginStudent(userData));
  };

  useEffect(() => {
    if (student) {
      setUserLoggedIn(true);
    }
  }, [student]);

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch(setError(null));
    }
  }, [error]);

  return (
    <SafeAreaView
      className="flex  bg-red-500"
      style={{ flex: 1, backgroundColor: COLORS.white }}
    >
      {loading ? (
        <Loading />
      ) : (
        <View className="" style={{ flex: 1, marginHorizontal: 22 }}>
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
                placeholderTextColor={"#99A2B4"}
                keyboardType="email-address"
                onChangeText={(text) => handleInputChange("email", text)}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <View className="flex flex-row  justify-between items-center">
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
                className="text-[#2980FF] "
              >
                Password
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("forgot Password")}
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              ></TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                height: 48,
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
                placeholderTextColor={"#99A2B4"}
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
          >
            {/* <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? COLORS.primary : undefined}
                    /> */}
            {/* 
          <Text>Remenber Me</Text> */}
          </View>
          <View className="flex flex-row justify-between">
            <Text></Text>
            <Text className="text-[13px] text-blue-400 font-semibold ">
              Forgot Password
            </Text>
          </View>

          <Button
            title="Login"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={handleSignIn}
          />

          {/* <View
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
            <Text style={{ fontSize: 14 }}>Or Login with</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../../assets/facebook.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../../assets/google.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Google</Text>
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 14, color: COLORS.black }}>
              Don't have an account ?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register Student")}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  marginLeft: 6,
                }}
                className="text-[#4080ED]"
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;
