import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Loading from "../component/Loading";
import Slider from "../component/Slider";
import axios from "axios";
import COLORS from "../constants/colors";
import Adds from "../component/Adds";

const Home = () => {
  const { student, loading } = useSelector((e) => e.student);
  const navigation = useNavigation();

  const basePath = "https://api.satisfiedjob.com/user";

  const images = [
    require("../../assets/banner/b3.jpg"),
    require("../../assets/banner/b1.jpg"),
    require("../../assets/banner/b4.jpg"),
  ];

  const [topCompany, setTopCompany] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const fetchTopCompany = async () => {
    try {
      const response = await axios.post(`${basePath}/topcompony`);
      setTopCompany(response.data.jobs);
    } catch (error) {
      ToastAndroid.show("Failed to fetch Top Company", ToastAndroid.SHORT);
    }
  };

  const fetchRecentJobs = async () => {
    try {
      const response = await axios.post(`${basePath}/resentjobs`);
      setRecentJobs(response.data.jobs);
      setFilteredJobs(response.data.jobs);
    } catch (error) {
      ToastAndroid.show("Failed to fetch recent jobs", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetchTopCompany();
    fetchRecentJobs();
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = recentJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.employer.organisationname
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(query.toLowerCase())
          )
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(recentJobs);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled={true}>
        {loading ? (
          <Loading />
        ) : (
          <View style={styles.content}>
            <View style={styles.header}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../assets/hero1.jpg")}
                  style={styles.heroImage}
                />
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={styles.welcomeText}>Hello 👋</Text>
                  <Text style={styles.title}>{student.name} </Text>
                </View>
              </View>
              <MaterialIcons name="notifications" size={24} />
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for jobs"
                value={searchQuery}
                onChangeText={handleSearchChange}
              />
              <Ionicons
                name="search"
                size={20}
                color={COLORS.grey}
                style={styles.searchIcon}
              />
            </View>
            <Adds />

            {/* <View style={styles.sliderContainer}>
              <Slider images={images} />
            </View> */}

            <View style={styles.recentJobsContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Jobs</Text>
              </View>
              <ScrollView horizontal={true}>
                <View style={styles.jobsList}>
                  {filteredJobs?.map((job, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => navigation.navigate("Jobs")}
                    >
                      <View style={styles.jobCard}>
                        <View style={styles.jobCardHeader}>
                          <Image
                            source={{ uri: job?.organisationlogo?.url }}
                            style={styles.jobCardImage}
                          />
                          <View>
                            <Text style={styles.jobCardTitle}>{job.title}</Text>
                            <Text style={styles.jobCardSubtitle}>
                              {job.employer.organisationname}
                            </Text>
                          </View>
                        </View>
                        <ScrollView
                          horizontal
                          contentContainerStyle={styles.jobSkillsContainer}
                        >
                          {job.skills.map((skill, skillIndex) => (
                            <Text key={skillIndex} style={styles.jobSkill}>
                              {skill.length > 5
                                ? `${skill.slice(0, 5)}...`
                                : skill}
                            </Text>
                          ))}
                        </ScrollView>
                        <View style={styles.jobCardFooter}>
                          <Text style={styles.jobCardSalary}>
                            ₹{job.salary}/month
                          </Text>
                          <Text style={styles.jobCardLocation}>
                            {job.location}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            <View style={styles.topCompanyContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Company</Text>
                <Text style={styles.showMoreText}>Show more</Text>
              </View>
              <ScrollView horizontal={true} style={styles.topCompanyList}>
                {topCompany.map((job, index) => {
                  const organisationlogo = job.employer.organisationlogo;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => navigation.navigate("Jobs")}
                    >
                      <View style={styles.topCompanyCard}>
                        <Image
                          source={{ uri: organisationlogo?.url }}
                          style={styles.topCompanyImage}
                        />
                        <View>
                          <Text style={styles.topCompanyTitle}>
                            {job.title}
                          </Text>
                          <Text style={styles.topCompanySubtitle}>
                            {job.employer.organisationname}
                          </Text>
                        </View>
                        <Text style={styles.topCompanySalary}>
                          ₹{job.salary}/month
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    width: "100%",
    minHeight: "100vh",
    paddingHorizontal: 13,
    paddingVertical: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 1,
  },
  welcomeText: {
    fontSize: 13,
    color: COLORS.grey,
    opacity: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  heroImage: {
    height: 40,
    width: 38,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 5,
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 2,
  },
  recentJobsContainer: {
    marginTop: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "500",
  },
  showMoreText: {
    fontSize: 11,
    opacity: 0.7,
  },
  jobsList: {
    flexDirection: "row",
    gap: 2,
    paddingVertical: 2,
  },
  jobCard: {
    width: 200,
    height: 140,
    backgroundColor: "#2cc57b",
    borderRadius: 8,
    overflow: "hidden",
    padding: 8,
  },
  jobCardHeader: {
    marginLeft: -32,
    flexDirection: "row",
    alignItems: "center",
  },
  jobCardImage: {
    width: 25,
    height: 25,
    borderRadius: 8,
    marginRight: 10,
  },
  jobCardTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  jobCardSubtitle: {
    fontSize: 11,
    opacity: 0.5,
    color: "white",
  },
  jobSkillsContainer: {
    marginTop: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  jobSkill: {
    fontSize: 11,
    color: "white",
    backgroundColor: "#c7c8cc45",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  jobCardFooter: {
    marginTop: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jobCardSalary: {
    fontSize: 11,
    color: "white",
  },
  jobCardLocation: {
    fontSize: 11,
    color: "white",
  },
  topCompanyContainer: {
    marginTop: 1,
  },
  topCompanyList: {
    gap: 2,
  },
  topCompanyCard: {
    width: 130,
    height: 150,
    backgroundColor: "#EBF1FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 2,
    marginVertical: 1,
  },
  topCompanyImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  topCompanyTitle: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  topCompanySubtitle: {
    fontSize: 10,
    opacity: 0.5,
    textAlign: "center",
  },
  topCompanySalary: {
    fontSize: 12,
    fontWeight: "600",
  },
});

export default Home;
