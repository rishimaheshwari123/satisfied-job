import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const screenWidth = Dimensions.get("window").width;

  // const chartData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //     },
  //   ],
  // };

  const [chartData, setChartData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `https://api.satisfiedjob.com/employer/admin/registration-stats`,
          {
            headers: {
              authorization: token,
            },
            withCredentials: true,
          }
        );
        const jsonData = response.data;
        const labels = jsonData.map((entry) => entry.date);
        const users = jsonData.map((entry) => entry.users);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "User Registrations",
              data: users,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#F6F6F6",
    backgroundGradientTo: "#F6F6F6",
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    decimalPlaces: 0,
    propsForHorizontalLabels: {
      withHorizontalLabels: false, // Disable default horizontal labels
      horizontalLabelRotation: 0, // Set rotation to 0
    },
  };

  useEffect(() => {
    fetchAdminInfo();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        "https://api.satisfiedjob.com/employer/admin/info",
        {
          headers: {
            authorization: token,
          },
          withCredentials: true,
        }
      );
      setAdminInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admin info:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : adminInfo ? (
        <View className="flex items-center justify-center">
          <View style={[styles.infoContainer]} className="space-y-4 py-[15px]">
            <View className="w-[250px] h-[60px] flex  flex-row justify-between px-[20px] space-x-2 items-center bg-[#0EA5E9] rounded-md">
              <Octicons name="people" size={23} color="white" />
              <Text className="text-white text-[16px] font-semibold">
                Total Students: {adminInfo.userCount}
              </Text>
            </View>
            <View className="w-[250px] h-[60px] flex flex-row justify-between px-[20px] space-x-2 items-center bg-[#F97316] rounded-md">
              <Octicons name="people" size={23} color="white" />
              <Text className="text-white text-[16px] font-semibold">
                Total Employers: {adminInfo.employerCount}
              </Text>
            </View>
            <View className="w-[250px] h-[60px] flex flex-row justify-between px-[20px] items-center bg-[#EAB308] rounded-md">
              <FontAwesome5 name="chart-line" size={23} color="white" />
              <Text className="text-white text-[16px] font-semibold">
                Total Jobs Posted: {adminInfo.jobCount}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <LineChart
              data={chartData}
              width={350}
              height={200}
              chartConfig={{
                backgroundColor: "#F6F6F6",
                backgroundGradientFrom: "#F6F6F6",
                backgroundGradientTo: "#F6F6F6",
                decimalPlaces: 0,
                color: () => "#4080ED",
                labelColor: () => "#000",
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "blue",
                },
              }}
              xAxisLabelRotation={55}
              bezier
            />
          </View>
        </View>
      ) : (
        <Text>No admin info available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AdminDashboard;
