import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { Table, Row } from "react-native-table-component";
import { useDispatch, useSelector } from "react-redux";
import { allApplications } from "../redux/action/employeeAction";
import StudentCard from "../component/Applications";
import StudentDetailsCard from "../component/Applications";
import ResponsiveTable from "../component/Applications";
import Loading from "../component/Loading";

const Dashboard = () => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const fadeInValue = useRef(new Animated.Value(0)).current;

  const { employee, allApplication, loading, error } = useSelector(
    (e) => e.employee
  );

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(allApplications({}));
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 800,
        delay: 200,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(fadeInValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Function to filter applications based on email, contact, or title
  const filterApplications = () => {
    if (!searchText.trim()) {
      Alert.alert("Please enter a search keyword.");
      return;
    }
    // Perform filtering based on email, contact, or title
    const filteredApplications = allApplication.filter((application) => {
      return (
        application.studentId.email?.includes(searchText) ||
        application.studentId.contact?.includes(searchText) ||
        application.jobId.title?.includes(searchText)
      );
    });
    return filteredApplications;
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>
              👋 Welcome Back {employee?.firstname}
            </Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search by email, contact, or title"
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                const filteredApplications = filterApplications();
                if (filteredApplications) {
                  setFilteredApplications(filteredApplications);
                }
              }}
            >
              <FontAwesome name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.dataCard}>
              <FontAwesome name="briefcase" size={24} color="#4080ED" />
              <Text style={styles.dataTitle}>Total Jobs Created</Text>
              <Text style={styles.dataValue}>{employee?.jobs.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dataCard}>
              <FontAwesome name="file-text-o" size={24} color="#4080ED" />

              <Text style={styles.dataTitle}>Total Applications Received</Text>
              <Text style={styles.dataValue}>
                {employee?.applications.length}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          {/* <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={350}
              height={200}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                decimalPlaces: 0,
                color: () => "#4080ED",
                labelColor: () => "#000",
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#4080ED",
                },
              }}
              bezier
            />
          </View> */}

          <ResponsiveTable
            data={searchText.trim() ? filterApplications() : allApplication}
          />
        </>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#4080ED",
    borderRadius: 10,
    padding: 10,
  },
  dataCard: {
    width: 130,
    height: 130,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 5,
    marginVertical: 5,
  },
  dataTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4080ED",
    textAlign: "center",
    marginBottom: 10,
  },
  dataValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4080ED",
    textAlign: "center",
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4080ED",
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4080ED",
    marginBottom: 10,
  },
  head: { height: 40, backgroundColor: "#f2f2f2" },
  text: { margin: 6, textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
});

export default Dashboard;
