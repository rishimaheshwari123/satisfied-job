import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  Image,
  Alert,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { handleIncomingCall } from "../component/Call";

import { FontAwesome } from "@expo/vector-icons"; // Importing FontAwesome icons from Expo
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { Linking } from "react-native";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import Slider from "../component/Slider";
import Placeholder from "../component/Placeholder";

const basePath = "https://api.satisfiedjob.com/employer";

const ViewAllEmploye = () => {
  const { employee, error, loading } = useSelector((e) => e.employee);
  const [searchTerm, setSearchTerm] = useState("");
  const [employes, setEmployes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const searchUsers = async () => {
      try {
        const response = await axios.post(
          `${basePath}/admin/employe?q=${searchTerm}`,
          null,
          {
            headers: {
              authorization: await AsyncStorage.getItem("token"),
            },
            withCredentials: true,
          }
        );
        setEmployes(response.data);
      } catch (error) {
        console.error(
          "Error fetching data:",
          JSON.stringify(error.response.data)
        );
      }
    };
    searchUsers();
  }, [searchTerm]);

  const MakeEmployeAdmin = async (id) => {
    try {
      const response = await axios.post(
        `https://api.satisfiedjob.com/admin/make/${id}`,
        null,
        {
          headers: {
            authorization: await AsyncStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setEmployes(response.data.employe);
    } catch (error) {
      console.error("Error making employer admin:", error);
    }
  };

  const images = [
    require("../../assets/banner/b3.jpg"),
    require("../../assets/banner/b1.jpg"),
    require("../../assets/banner/b4.jpg"),
  ];

  return (
    <>
      {employee?.length == 0 && !loading ? (
        <View className="w-full h-full">
          <Placeholder></Placeholder>
        </View>
      ) : (
        <View style={styles.container}>
          <View
            className={`h-[30px] rounded-md flex flex-row space-x-1 items-center justify-start mb-3`}
          >
            <TouchableOpacity
              onPress={() => {}}
              className="flex flex-row items-center w-[100%] min-h-[32px] border-[1px] border-gray-200 rounded-md  justify-start  px-1 bg-white"
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
                onChangeText={(text) => setSearchTerm(text)}
              ></TextInput>
            </TouchableOpacity>
          </View>

          <View className="">
            <ScrollView className="w-full pb-[50px]">
              <View className="flex flex-row items-center justify-center mb-[20px] rounded-lg">
                <Slider images={images} />
              </View>
              {employes?.map((e) => {
                return (
                  <View className="flex items-center">
                    <EmployeeCard
                      {...e}
                      setEmployes={setEmployes}
                    ></EmployeeCard>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f6f6f6",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    color: "#333",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.25, // For iOS shadow
    shadowRadius: 3.84, // For iOS shadow
  },
  detailsContainer: {
    flex: 1,
  },
  orgName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  email: {
    fontSize: 14,
    marginBottom: 5,
    color: "#777",
  },
  jobCount: {
    fontSize: 12,
    color: "#999",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
  },
});

export default ViewAllEmploye;

const EmployeeCard = ({
  _id,
  organisationname,
  organisationlogo,
  industry,
  jobs,
  location,
  companySize,
  contact,
  employer,
  jobType,
  salary,
  openings,
  isAlreadyApplied,
  jobId,
  applications,
  setEmployes,
}) => {
  const navigation = useNavigation();

  const DeleteEmployer = async (id) => {
    try {
      // Ask for confirmation
      Alert.alert(
        "Confirm Deletion",
        "Are you sure you want to delete this employer?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Deletion canceled"),
            style: "cancel",
          },
          {
            text: "Delete",
            onPress: async () => {
              // If user confirms deletion, proceed with the delete request
              const response = await axios.post(
                `https://api.satisfiedjob.com/employer/admin/delete/employer/${id}`,
                null,
                {
                  headers: {
                    authorization: await AsyncStorage.getItem("token"),
                  },
                  withCredentials: true,
                }
              );
              console.log("delete employee");
              setEmployes(response.data.user);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error deleting employer:", JSON.stringify(error));
    }
  };
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
        width: "100%",
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
          <Image
            source={{ uri: organisationlogo?.url }}
            style={{ width: 35, height: 35, borderRadius: 20, marginRight: 5 }}
          />
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#333333" }}
              className="capitalize"
            >
              {organisationname}
            </Text>
            <Text className="text-black text-[13px]">{industry}</Text>
          </View>
        </View>
        {applications.length > 0 && (
          <Text className="text-[#4080ED]">+{applications.length}</Text>
        )}
      </View>
      <View className="flex items-start">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Ionicons name="location-outline" size={16} color="#8A8A8A" />

          <Text
            style={{ fontSize: 13, color: "#8A8A8A", marginLeft: 5 }}
            className="capitalize"
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
          <MaterialIcons name="post-add" size={16} color="#8A8A8A" />
          <Text style={{ fontSize: 13, color: "#8A8A8A", marginLeft: 5 }}>
            Jobs {jobs.length}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Feather name="users" size={16} color="#8A8A8A" />
          <Text style={{ fontSize: 13, color: "#8A8A8A", marginLeft: 5 }}>
            {companySize}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Feather name="phone" size={16} color="#8A8A8A" />
          <Text style={{ fontSize: 13, color: "#8A8A8A", marginLeft: 5 }}>
            {contact}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        className="space-x-2"
      >
        <TouchableOpacity
          onPress={() => DeleteEmployer(_id)}
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
              Delete
            </Text>
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
