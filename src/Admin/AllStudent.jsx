import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from "react-native";
import axios from "axios";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";

/* icons */
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import Slider from "../component/Slider";
import Placeholder from "../component/Placeholder";

/*  */

const ViewAllUsers = () => {
  const downloadPDF = (url) => {
    Linking.openURL(url);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const basePath = `https://api.satisfiedjob.com/employer`;

  const deleteUser = async (id) => {
    const response = await axios.post(
      `${basePath}/admin/delete/user/${id}`,
      null,
      {
        headers: {
          authorization: await AsyncStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setUsers(response.data.user);
  };

  useEffect(() => {
    const searchUsers = async () => {
      const response = await axios.post(
        `${basePath}/admin/user?q=${searchTerm}`,
        null,
        {
          headers: {
            authorization: await AsyncStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setUsers(response.data);
    };
    searchUsers();
  }, [searchTerm]);

  const images = [
    require("../../assets/banner/b3.jpg"),
    require("../../assets/banner/b1.jpg"),
    require("../../assets/banner/b4.jpg"),
  ];

  return (
    <>
      {users?.length === 0 ? (
        <>
          <Placeholder></Placeholder>
        </>
      ) : (
        <View>
          <View
            className={`h-[30px] rounded-md flex flex-row space-x-1 items-center justify-start px-[15px] my-[8px]`}
          >
            <TouchableOpacity className="flex flex-row items-center w-[100%] min-h-[32px] border-[1px] border-gray-200 rounded-md  justify-start  px-1 bg-white">
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

          <View className="pb-[80px]  px-[15px]">
            <ScrollView className="">
              <View className="flex flex-row items-center justify-center mb-3 ">
                <Slider images={images} />
              </View>
              {users.reverse().map((e) => {
                return (
                  <View key={e._id} className="flex items-center ">
                    <StudentCard
                      {...e}
                      downloadPDF={downloadPDF}
                      deleteUser={deleteUser}
                    ></StudentCard>
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

export default ViewAllUsers;

const StudentCard = ({
  _id,
  name,
  email,
  applications,
  avatar,
  city,
  contact,
  gender,
  resumePdf,
  jobapplications,
  deleteUser,
  downloadPDF,
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
            source={{ uri: avatar.url }}
            style={{ width: 35, height: 35, borderRadius: 20, marginRight: 5 }}
          />
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#333333" }}
              className="capitalize"
            >
              {name}
            </Text>
            <Text className="text-black text-[11px] opacity-[0.5]">
              {email}
            </Text>
          </View>
        </View>

        {applications?.length > 0 && (
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
          <Ionicons name="location-outline" size={12} color="#8A8A8A" />

          <Text
            style={{ fontSize: 12, color: "#8A8A8A", marginLeft: 5 }}
            className="capitalize"
          >
            {city}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <AntDesign name="phone" size={12} color="#8A8A8A" />
          <Text style={{ fontSize: 12, color: "#8A8A8A", marginLeft: 5 }}>
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
        {resumePdf?.fileId && (
          <TouchableOpacity
            onPress={() => downloadPDF(resumePdf.url)}
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
                Resume
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => deleteUser(_id)}
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
      </View>
    </Animated.View>
  );
};
