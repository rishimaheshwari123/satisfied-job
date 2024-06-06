import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { allJobs, getJobById } from "../redux/action/jobAction";
import { useRoute } from "@react-navigation/native";
import { applicationSend } from "../redux/action/studentAction";
import Loading from "../component/Loading";

const Details = ({}) => {
  const { jobs, job, loading } = useSelector((e) => e.Jobs);
  const { student, loading: loading2, error } = useSelector((e) => e.student);
  const { employee } = useSelector((e) => e.employee);
  const [isApplied, setApplied] = useState(false);

  const [Tab, setTab] = useState("About");

  const dispatch = useDispatch();
  const route = useRoute();
  const { id } = route.params;

  const checkIsApplyed = async () => {
    const currentId = id?.toString();
    const apply = student?.jobapplications?.includes(currentId);
    if (apply) {
      setApplied(true);
    }
  };

  useEffect(() => {
    dispatch(getJobById(id));
    checkIsApplyed(id);
  }, []);

  /* TODO */
  function HandelApply() {
    dispatch(applicationSend({ jobId: id, resume: "a.pdf" }));
    setApplied(true);
  }

  return (
    <View className="bg-white">
      {loading ? (
        <Loading />
      ) : (
        <>
          {job && (
            <>
              <View className="w-full h-[35vh] rounded-b-[28px] flex items-center justify-center bg-[#4080ED] space-y-1">
                <Image
                  source={{ uri: job?.employer?.organisationlogo?.url }}
                  className="h-[60px] w-[60px] mx-auto  rounded-full"
                ></Image>
                <Text className="text-white text-md  font-semibold">
                  {job?.title}
                </Text>
                <Text className="text-white text-1xl opacity-[0.8]">
                  {job?.employer.organisationname}
                </Text>
                <View className="flex flex-row  justify-center w-full gap-3">
                  {job?.skills.slice(0, 3)?.map((e) => {
                    return (
                      <Text className="bg-[#ffffff61] uppercase  text-[12px] px-[10px] py-[3px] rounded-md text-white">
                        {e}
                      </Text>
                    );
                  })}
                </View>
                <View className="flex flex-row justify-evenly space-x-5 w-full px-[20px] py-[10px]">
                  <Text className="text-white font-semibold">
                    {job.salary}/year
                  </Text>
                  <Text className="text-white font-semibold">
                    {job.location},India
                  </Text>
                </View>
              </View>

              <View className="flex flex-row justify-evenly pt-2">
                <Text
                  className={`opacity-[0.5]  ${
                    Tab == "About" &&
                    "border-b-[1.5px] border-black opacity-[1]"
                  }`}
                  onPress={() => setTab("About")}
                >
                  About
                </Text>
                <Text
                  className={`opacity-[0.5]  ${
                    Tab == "Description" &&
                    "border-b-[1.5px] border-black opacity-[1]"
                  }`}
                  onPress={() => setTab("Description")}
                >
                  Description
                </Text>

                <Text
                  className={`opacity-[0.5]  ${
                    Tab == "Company" &&
                    "border-b-[1.5px] border-black opacity-[1]"
                  }`}
                  onPress={() => setTab("Company")}
                >
                  Company
                </Text>
              </View>

              <ScrollView className="h-[51vh] bg-white">
                {job && <JobCard {...job} Tab={Tab}></JobCard>}
              </ScrollView>
              {student && (
                <TouchableOpacity
                  onPress={() => !isApplied && HandelApply()}
                  className="w-[90vw] mx-auto mb-5 h-[50px] flex items-center justify-center rounded-xl bg-[#4080ED] fixed"
                >
                  {loading2 ? (
                    <Text className="text-white font-semibold">Loading...</Text>
                  ) : (
                    <View>
                      {isApplied ? (
                        <Text className="text-white">Applied</Text>
                      ) : (
                        <Text className="text-white font-semibold">
                          Apply Now
                        </Text>
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              )}
              {employee && (
                <TouchableOpacity className="w-[90vw] mx-auto mb-5 h-[50px] flex items-center justify-center rounded-xl bg-[#4080ED] fixed">
                  <Text className="text-white font-semibold">Apply</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </>
      )}
    </View>
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
  jobId,
  navigation,
  description,
  preferences,
  organisationname,
  category,
  Tab,
}) => {
  const { student } = useSelector((e) => e.student);

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        width: "100%",
        padding: 10,
        borderRadius: 2,
        marginBottom: 20,
      }}
      className="px-[25px]"
    >
      {Tab == "About" && (
        <About
          title={title}
          location={location}
          jobType={jobType}
          salary={salary}
          openings={openings}
          skills={skills}
          organisationname={organisationname}
          category={category}
        />
      )}

      {Tab == "Description" && (
        <Description preferences={preferences} description={description} />
      )}

      {Tab == "Company" && (
        <Company employer={employer} organisationname={organisationname} />
      )}

      {Tab == "Review" && <Review />}
    </View>
  );
};

function About({
  title,
  location,
  jobType,
  salary,
  openings,
  category,
  skills,
  employer,
  organisationname,
}) {
  return (
    <>
      <View
        style={{
          flexDirection: "col",
          alignItems: "start",
          justifyContent: "start",
        }}
        className="my-[10px] text-center mx-auto"
      >
        <Text className="text-[12px] opacity-[.5] mx-auto">
          {organisationname}
        </Text>
        <Image source={{ uri: "../.../../../assets/2.webp" }} />
      </View>

      <Text className="font-semibold mb-[10px]">Details</Text>
      <View
        style={{
          flexDirection: "col",
          justifyContent: "",
          marginBottom: 5,
        }}
        className="flex space-y-3"
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
          <Text style={{ color: "#8A8A8A", marginLeft: 4 }}>{jobType}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
          className="pl-1"
        >
          <FontAwesome
            className="ml-[15px]"
            name="rupee"
            size={16}
            color="#8A8A8A"
          />
          <Text style={{ color: "#8A8A8A", marginLeft: 4 }}>
            {salary} / Per Month
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* <FontAwesome name="shopping-bag" size={14} color="#8A8A8A" /> */}
          <MaterialIcons name="library-books" size={14} color="#8A8A8A" />
          <Text style={{ color: "#8A8A8A", marginLeft: 5 }}>{category}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="shopping-bag" size={14} color="#8A8A8A" />
          <Text style={{ color: "#8A8A8A", marginLeft: 5 }}>
            {openings} Openings
          </Text>
        </View>

        {/* skills */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text className="font-semibold mb-[1px]">Skills:</Text>
          {skills?.map((e) => {
            return (
              <Text
                style={{ color: "#8A8A8A", marginLeft: 5 }}
                className="capitalize"
              >
                {e}
              </Text>
            );
          })}
        </View>
      </View>
    </>
  );
}

function Description({ description, preferences }) {
  return (
    <>
      <View className="my-1 w-full space-y-2">
        <View>
          <Text className="text-md font-semibold text-md">Description</Text>
          <View style={{ marginLeft: 15 }} className="space-y-1">
            {description.map((e) => {
              return (
                <Text style={{ marginLeft: 5 }} className="text-[13px]">
                  • {e}
                </Text>
              );
            })}
          </View>
        </View>
        <View>
          <Text className="text-md font-semibold text-md">Preference</Text>
          <View style={{ marginLeft: 15 }} className="space-y-1">
            {preferences.map((e) => {
              return (
                <Text style={{ marginLeft: 5 }} className="text-[13px]">
                  • {e}
                </Text>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
}

const Company = ({ employer }) => {
  const companyData = {
    name: "Company Inc.",
    industry: "Tech",
    location: "San Francisco, CA",
    employees: 1000,
    hrManager: "Jane Smith",
    hrContact: "jane.smith@coolcompany.com",
  };

  return (
    <View style={styles.container} className="space-y-2">
      <View>
        <Text style={styles.title} className="my-1">
          {companyData.name}
        </Text>
        <View className="space-y-[0.5]">
          <Text style={styles.text}>Industry: {employer.organisationname}</Text>
          <Text style={styles.text}>Location: {employer.location}</Text>
          <Text style={styles.text}>Employees: {companyData.employees}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title} className="my-1">
          Details:
        </Text>

        <View className="space-y-[0.5]">
          <Text style={styles.text}>
            Total Active job posts:
            {employer.jobs.length}
          </Text>

          <Text style={styles.text}>
            Manager: {employer?.firstname}
            {employer?.lastname}
          </Text>
          <Text style={styles.text}>Contact: {employer?.contact}</Text>
          <Text style={styles.text}>Email: {employer?.email}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title} className="my-1">
          Description
        </Text>
        <View className="space-y-[0.5]">
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            non laboriosa
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  text: {
    fontSize: 14,
    marginBottom: 3,
  },
});
