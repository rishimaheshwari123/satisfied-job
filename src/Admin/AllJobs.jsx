import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { handleIncomingCall } from "../component/Call";
import { useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

import { Fontisto } from "@expo/vector-icons";

import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import CoolDrawer from "../component/DrawerFilter";
import { useDispatch, useSelector } from "react-redux";
import { AllJobs } from "../redux/action/studentAction";

import Slider from "../component/Slider";
const Jobs = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate("Jobs");
  };
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { allJobs, error, loading, page } = useSelector((e) => e.student);

  const { currentPage, totalPages } = page;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const images = [
    require("../../assets/banner/b3.jpg"),
    require("../../assets/banner/b1.jpg"),
    require("../../assets/banner/b4.jpg"),
  ];

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    skills: "",
    inOffice: false,
    remote: false,
    internship: false,
    salary: "",
  });
  const [Page, setPage] = useState(currentPage);

  useEffect(() => {
    dispatch(AllJobs({ page: Page, ...formData }));
  }, [Page, formData]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handelSubmit = () => {
    dispatch(AllJobs({ ...formData, page: 1 }));
    toggleDrawer();
  };

  const goToNextPage = () => {
    if (Page < totalPages) {
      setPage(Page + 1);
    }
  };

  const goToPrevPage = () => {
    if (Page > 1) {
      setPage(Page - 1);
    }
  };

  return (
    <ScrollView className="relative" style={{ flex: 1 }}>
      {allJobs?.length === 0 && !loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "blue" }}>
              Not Found. Click here to refresh.
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {loading ? (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loading />
            </View>
          ) : (
            <>
              <View>
                <CoolDrawer
                  isDrawerOpen={isDrawerOpen}
                  setIsDrawerOpen={setIsDrawerOpen}
                  toggleDrawer={toggleDrawer}
                  formData={formData}
                  setFormData={setFormData}
                  handelSubmit={handelSubmit}
                />
              </View>
              <View
                className={`h-[30px]  my-[10px] rounded-md flex flex-row  space-x-1 px-[10px]  items-center justify-start`}
              >
                <TouchableOpacity
                  onPress={handelSubmit}
                  className="flex flex-row items-center w-[87.5%] min-h-[30px] rounded-md justify-start  px-1 bg-white"
                >
                  <EvilIcons
                    className="mx-2 px-3 font-semibold"
                    name="search"
                    size={20}
                    color="gray"
                  />
                  <TextInput
                    className="text-[11px]"
                    placeholder="Search your dream job"
                    value={formData.title}
                    onChangeText={(text) => handleInputChange("title", text)}
                  ></TextInput>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={toggleDrawer}
                  className="w-[30px] flex items-center justify-center
             h-[30px] bg-white  opacity-[0.5] rounded-md"
                >
                  <AntDesign name="filter" size={15} color="#008BDC" />
                </TouchableOpacity>
              </View>
              <View className="flex flex-row items-center justify-center px-[13px]">
                <Slider images={images} />
              </View>
              <View className="flex items-center my-[12px]">
                {allJobs &&
                  allJobs?.map((job, index) => {
                    return (
                      <>
                        <JobCard {...job}></JobCard>
                        {index === 4 && (
                          <View>
                            <View className="font-semibold m-[13px] mb-[16px]">
                              <View className="flex flex-row justify-between py-1 mb-2">
                                <Text className="text-[13px] font-[500]">
                                  Top Company
                                </Text>
                              </View>
                              <View className="gap-2 h-fit  overflow-scroll flex flex-row">
                                <ScrollView horizontal className="space-x-2">
                                  <View className="w-[130px] h-[150px] bg-[#EBF1FF] rounded-lg flex justify-center items-center space-y-2">
                                    <Image
                                      source={require("../../assets/Images/facebook.png")}
                                      className="w-[38px] h-[38px] rounded-md mx-auto"
                                    ></Image>
                                    <View className="text-center">
                                      <Text className="text-[12px] font-semibold">
                                        UX Designer
                                      </Text>
                                      <Text className="text-[10px] mx-auto opacity-[0.5]">
                                        facebook
                                      </Text>
                                    </View>
                                    <Text className="text-[12px] font-semibold">
                                      ₹80,000/y
                                    </Text>
                                  </View>

                                  <View className="w-[130px] h-[150px] bg-[#d7f8e0] rounded-lg flex justify-center items-center space-y-2">
                                    <Image
                                      source={require("../../assets/Images/google.png")}
                                      className="w-[36px] h-[36px] rounded-md mx-auto"
                                    ></Image>
                                    <View className="text-center">
                                      <Text className="text-[12px] font-semibold">
                                        UX Designer
                                      </Text>
                                      <Text className="text-[10px] mx-auto opacity-[0.5]">
                                        Google
                                      </Text>
                                    </View>
                                    <Text className="text-[12px] font-semibold">
                                      ₹98,000/y
                                    </Text>
                                  </View>

                                  <View className="w-[130px] h-[150px] bg-[#EBF1FF] rounded-lg flex justify-center items-center space-y-2">
                                    <Image
                                      source={require("../../assets/Images/facebook.png")}
                                      className="w-[38px] h-[38px] rounded-md mx-auto"
                                    ></Image>
                                    <View className="text-center">
                                      <Text className="text-[12px] font-semibold">
                                        UX Designer
                                      </Text>
                                      <Text className="text-[10px] mx-1 opacity-[0.5]">
                                        UX Designer
                                      </Text>
                                    </View>
                                    <Text className="text-[12px] font-semibold">
                                      ₹80,000/y
                                    </Text>
                                  </View>
                                </ScrollView>
                              </View>
                            </View>
                          </View>
                        )}
                      </>
                    );
                  })}
              </View>
              <View className="flex flex-row justify-between p-[12px]">
                <TouchableOpacity
                  className="bg-white px-[5px] py-[4px] rounded-sm"
                  onPress={goToPrevPage}
                  disabled={page === 1}
                >
                  <Text className="text-[11px]">Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-white px-[5px] py-[4px] rounded-sm"
                  onPress={goToNextPage}
                  disabled={page === totalPages}
                >
                  <Text className="text-[11px]">Next</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </>
      )}
    </ScrollView>
  );
};

export default Jobs;

import * as Linking from "expo-linking";
import Loading from "../component/Loading";
import { getDaysSinceToday } from "../constants/date";
import Placeholder from "../component/Placeholder";
import { Button } from "react-native-paper";

const JobCard = ({
  _id,
  title,
  skills,
  employer,
  location,
  jobType,
  salary,
  openings,
  isAlreadyApplied,
  jobId,
  applications,
  createdAt,
}) => {
  const navigation = useNavigation();

  const scaleAnimation = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        backgroundColor: "#FFFFFF",
        width: "90%",
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        transform: [{ scale: scaleAnimation }],
      }}
    >
      <View className="flex flex-row justify-between">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          {/* organisationlogo */}
          <Image
            source={{ uri: employer?.organisationlogo?.url }}
            style={{ width: 35, height: 35, borderRadius: 20, marginRight: 5 }}
          />
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#333333" }}
              className="capitalize"
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 12.5,
                color: "#666666",
                textTransform: "capitalize",
              }}
            >
              {employer.organisationname}
            </Text>
          </View>
        </View>

        {applications.length > 0 && (
          <Text className="text-[#4080ED]">+{applications.length}</Text>
        )}
      </View>

      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <AntDesign name="clockcircleo" size={13} color="#8A8A8A" />
          <Text
            style={{ color: "#8A8A8A", marginLeft: 5 }}
            className="capitalize text-[13px]"
          >
            {getDaysSinceToday(createdAt)} days ago
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Ionicons name="location-outline" size={13} color="#8A8A8A" />
          <Text
            style={{ color: "#8A8A8A", marginLeft: 5 }}
            className="capitalize text-[13px]"
          >
            {location}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <MaterialCommunityIcons
            name="currency-rupee"
            size={13}
            color="#8A8A8A"
          />

          <Text style={{ fontSize: 13, color: "#8A8A8A", marginLeft: 5 }}>
            {salary} / Per Months
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <FontAwesome name="building-o" size={13} color="#8A8A8A" />
          <Text style={{ fontSize: 13, color: "#8A8A8A", marginLeft: 5 }}>
            {jobType}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Job Details", { id: _id })}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 12, color: "#4080ED", marginRight: 5 }}>
              View Details
            </Text>
            <AntDesign name="arrowright" size={12} color="#4080ED" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleIncomingCall(employer?.contact)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View
            style={{
              backgroundColor: "#2cc57b",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 5,
            }}
          >
            <Text
              style={{ fontSize: 12, color: "#FFFFFF", fontWeight: "bold" }}
            >
              Call HR
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
