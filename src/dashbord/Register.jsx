import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Button,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { registerEmployee } from "../redux/action/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../component/Loading";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import OTPInputModal from "../component/OTP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setError } from "../redux/sclice/employeeSclice";

const Register = ({ route }) => {
  const { setUserLoggedIn, setEmployeeLoggedIn } = route.params;
  const dispatch = useDispatch();
  const { employee, error, loading } = useSelector((e) => e.employee);

  const [userData, setUserData] = useState({
    contact: "",
    email: "",
    organisationname: "",
    password: "",
    firstname: "",
  });

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef(null);
  const { width } = Dimensions.get("window");
  const [modalVisible, setModalVisible] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const navigation = useNavigation();
  const scrollTo = (x) => scrollViewRef.current.scrollTo({ x, animated: true });

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch(setError(null));
    }
  }, [error]);

  const handlePrev = () => {
    scrollTo(currentStep - 1 * width);
    setCurrentStep((prevStep) => prevStep - 1);
  };

  /*  */

  const handleSignUp = () => {
    if (
      !userData.firstname ||
      !userData.email ||
      !userData.contact ||
      !userData.password ||
      !userData.organisationname
    ) {
      ToastAndroid.show("please fill all Details", ToastAndroid.SHORT);
      return;
    }
    dispatch(registerEmployee(userData));

   
  };

  const BasicDetails = () => {
    if (
      !userData.firstname ||
      !userData.email ||
      !userData.contact ||
      !userData.password ||
      !userData.organisationname
    ) {
      ToastAndroid.show("please fill all Details", ToastAndroid.SHORT);
      return;
    }
    dispatch(registerEmployee(userData));
  };

  useEffect(() => {
    const getTokenAndNavigate = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setModalVisible(true);
      }
    };
    getTokenAndNavigate();
  }, [BasicDetails]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <OTPInputModal
              scrollTo={scrollTo}
              visible={modalVisible}
              setModalVisible={setModalVisible}
              onClose={() => setModalVisible(false)}
            />
          </View>

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
              className="text-[#99A2B4] mx-auto"
            >
              Hello again you have been missed! Student
            </Text>
          </View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={scrollEnabled}
          >
            <View style={{ width, paddingHorizontal: 22 }}>
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
                    placeholder="Enter your Name"
                    onChangeText={(text) =>
                      handleInputChange("firstname", text)
                    }
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
                  Organization Name
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
                    placeholder="Enter your organization name"
                    onChangeText={(text) =>
                      handleInputChange("organisationname", text)
                    }
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
                  Contact
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
                    placeholder="Enter your contact number"
                    onChangeText={(text) => handleInputChange("contact", text)}
                    keyboardType="numeric"
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
                    onChangeText={(text) => handleInputChange("password", text)}
                    secureTextEntry={!isPasswordShown}
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

              <View className="mt-[20px]">
                <Button
                  title="Submit"
                  filled
                  style={{
                    marginTop: 80,
                    marginBottom: 4,
                  }}
                  onPress={BasicDetails}
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
                  onPress={() => navigation.navigate("Login Employee")}
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
            </View>

            <View style={{ width, paddingHorizontal: 22 }}>
              <View style={{ marginBottom: 3 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    marginVertical: 8,
                  }}
                  className="text-[#2980FF]"
                >
                  Industry
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
                    placeholder="Enter Industry"
                    onChangeText={(text) => handleInputChange("industry", text)}
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
                  Company Size
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
                    placeholder="Enter Company Size"
                    onChangeText={(text) =>
                      handleInputChange("companySize", text)
                    }
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
                  Compony Location
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
                    placeholder="Enter your Compony Location"
                    onChangeText={(text) => handleInputChange("location", text)}
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
                  Compony Website
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
                    placeholder="Enter your Compony Website"
                    onChangeText={(text) => handleInputChange("website", text)}
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
                  Social Media Links
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
                    placeholder="Social Media Links"
                    onChangeText={(text) =>
                      handleInputChange("socialMedia", text)
                    }
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>

              <View className="mt-[20px]">
                <Button
                  title="Register"
                  filled
                  style={{
                    marginTop: 80,
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
                  onPress={() => navigation.navigate("Login Employee")}
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
            </View>
          </ScrollView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Register;
