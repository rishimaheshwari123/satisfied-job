import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { handleIncomingCall } from "../component/Call";

import { SimpleLineIcons } from "@expo/vector-icons";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { allJobs } from "../redux/action/jobAction";
const AllJobs = ({ navigate }) => {
  const { jobs, loading, error } = useSelector((e) => e.Jobs);
  const { employee } = useSelector((e) => e.employee);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(allJobs());
  }, [navigation]);

  const images = [
    require("../../assets/banner/b3.jpg"),
    require("../../assets/banner/b1.jpg"),
    require("../../assets/banner/b4.jpg"),
  ];

  return (
    <>
      {allJobs?.length != 0 && !loading ? (
        <>
          <Placeholder></Placeholder>
        </>
      ) : (
        <ScrollView className="relative">
          <View className="flex flex-row items-center justify-center mt-[10px]">
            <Slider images={images} />
          </View>

          <View className="flex items-center  py-3">
            {loading ? (
              <Loading />
            ) : (
              jobs?.map((e, i) => {
                return <JobCard {...e}></JobCard>;
              })
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default AllJobs;

import * as Linking from "expo-linking";
import Loading from "../component/Loading";
import Slider from "../component/Slider";
import { getDaysSinceToday } from "../constants/date";
import Placeholder from "../component/Placeholder";

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
  const { employee } = useSelector((e) => e.employee);

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

  const callHR = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
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
            source={{ uri: employee?.organisationlogo?.url }}
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
              {employee?.organisationname}
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
            {salary} / Per Month
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

        <View className="flex flex-row gap-2">
          {/* TODO */}

          <TouchableOpacity
            onPress={() => {}}
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
                className=""
                style={{ fontSize: 12, color: "#FFFFFF", fontWeight: "bold" }}
              >
                <AntDesign name="delete" size={14.5} color="white" />
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("EditEmployeeJob", { id: _id })}
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
                Edit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};
