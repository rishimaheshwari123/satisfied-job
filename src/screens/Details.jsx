import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../component/Header";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const Details = () => {
  const job = {
    id: 1,
    title: "Software Engineer",
    location: "New York",
    jobType: "Full-time",
    salary: "$100,000",
    openings: 5,
    description: "This is a software engineer job description.",
    preferences: "Preferences for software engineer job.",
    skills: ["React Native", "JavaScript", "Redux"],
    employer: {
      organisationname: "Jalan Technology Consulting",
      organisationlogo: { url: "your_logo_url" }, // Provide a dummy logo URL
    },
  };

  const jobData = {
    title: "Software Engineer",
    skills: ["JavaScript", "React", "Node.js"],
    employer: { organisationlogo: { url: "https://example.com/logo1.png" } },
    location: "New York",
    jobType: "Full-time",
    salary: 100000,
    openings: 5,
    isAlreadyApplied: false,
    jobId: 1,
  };


  return (
    <ScrollView>
      <JobCard {...jobData}></JobCard>
    </ScrollView>
  );
};

export default Details;

const JobCard = ({
  title,
  skills,
  employer,
  location,
  jobType,
  salary,
  openings,
  isAlreadyApplied,
  jobId,
  navigation,
}) => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        padding: 20,
        borderRadius: 2,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: "col",
          alignItems: "start",
          justifyContent: "start",
          marginBottom: 10,
        }}
      >
        <View className=" border-[#8A8A8A] w-[34%] border-[1px] rounded-sm flex items-center px-1 py-[2px]">
          <Text className="text-[10px] text-[#5794FF]">Actively hiring</Text>
        </View>
        <Text
          style={{ fontSize: 14, fontWeight: "bold" }}
          className="my-1 text-[#484848]"
        >
          {title}
        </Text>
        <Text className="text-[12px] opacity-[.5]">INEXT ETS</Text>
        <Image source={{ uri: "../.../../../assets/2.webp" }} />
      </View>

      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            flexDirection: "col",
            justifyContent: "",
            marginBottom: 5,
          }}
          className="flex gap-2"
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Ionicons name="location-outline" size={16} color="#8A8A8A" />
            <Text
              style={{
                textTransform: "capitalize",
                color: "#8A8A8A",
                marginLeft: 5,
              }}
            >
              {location}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <MaterialCommunityIcons
              name="progress-clock"
              size={16}
              color="#8A8A8A"
            />
            <Text style={{ color: "#8A8A8A", marginLeft: 5 }}>{jobType}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <FontAwesome
              className="ml-[15px]"
              name="rupee"
              size={16}
              color="#8A8A8A"

            />
            <Text style={{ color: "#8A8A8A", marginLeft: 4 }}>
              {salary} / Per Year
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="shopping-bag" size={16} color="#8A8A8A" />
            <Text style={{ color: "#8A8A8A", marginLeft: 5 }}>
              {openings} Openings
            </Text>
          </View>
        </View>
      </View>

      <View className="my-1">
        <Text className="text-md">About the Job</Text>
        <Text className="text-[12px] mt-1 font-light">
          1. Understanding and translating customer requirements to technical
          specifications & writing clean, effective, and scalable code
        </Text>
        <Text className="text-[12px] mt-1 font-light">
          2 . Understanding and translating customer requirements to technical
          specifications & writing clean, effective, and scalable code
        </Text>
      </View>

      <View className="my-1">
        <Text className="text-md">Skill(s) required</Text>
        <View className="flex flex-row  py-2 w-full">
          <Text className="my-2 mr-1 bg-[#F8F8F8] text-[12px] px-2 py-2 rounded-md">
            HTML
          </Text>
          <Text className="my-2 mx-1 bg-[#F8F8F8] text-[12px] px-2 py-2 rounded-md">
            CSS
          </Text>
          <Text className="my-2 mx-1 bg-[#F8F8F8] text-[12px] px-2 py-2 rounded-md">
            PHP
          </Text>
          <Text className="my-2 mx-1 bg-[#F8F8F8] text-[12px] px-2 py-2 rounded-md">
            JavaScript
          </Text>
        </View>
      </View>

      <View className="my-1">
        <Text className="text-md">Salary</Text>
        <Text className="text-[12px] mt-1 font-light">Duration:3 Month</Text>
        <Text className="text-[12px] mt-1 font-light">
          Salary during probation: ₹10,000 - 10,001 /month (only for freshers)
        </Text>

        <Text className="text-[12px] mt-1 font-light">
           Annual CTC: ₹ 3,00,000 - 3,50,000 /year
        </Text>

      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#5794FF",
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 4,
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "#5794FF", fontSize: 12 }} className="mx-auto">
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
