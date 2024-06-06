import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
  StatusBar,
  ScrollView,
  Platform,
} from "react-native";

import * as FileSystem from "expo-file-system";

import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setError } from "../redux/sclice/studentSclice";
import { avatarStudent, updateStudent } from "../redux/action/studentAction";
import Loading from "../component/Loading";

import { Linking } from "react-native";

/* image and pdf */
import * as ImagePicker from "expo-image-picker";
import DocumentUploadScreen from "../component/uploadResuma";

const ProfileStudent = () => {
  const navigation = useNavigation();
  const { student, loading, error } = useSelector((e) => e.student);

  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "John",
    email: "john.doe@example.com",
    contact: "1234567890",
    city: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student?.name,
        email: student?.email,
        contact: student?.contact,
        city: student?.city,
      });
    }
  }, [student]);

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch(setError(null));
    }
  }, [error]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    dispatch(updateStudent(formData));
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#4080ED");
  }, []);

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    const avatarFile = {
      uri: result.assets[0].uri,
      name: "avatar.jpg",
      type: result.assets[0].mimeType,
    };

    dispatch(avatarStudent(avatarFile));

    if (!result.cancelled) {
      setImage(result.uri);
    }

    if (image) {
    }
  };

  const downloadResume = async (url) => {
    console.log(url);
    const filename = "small.pdf";
    const result = await FileSystem.downloadAsync(
      `${url}`,
      FileSystem.documentDirectory + filename
    );
    console.log(result);

    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const downloadResumeApi = async () => {
    const filename = "MissCoding.pdf";
    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    const result = await FileSystem.downloadAsync(
      `http://${localhost}:5000/generate-pdf?name=MissCoding&email=hello@tripwiretech.com`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          MyHeader: "MyValue",
        },
      }
    );
    console.log(result);
    save(result.uri, filename, result.headers["Content-Type"]);
  };
  const save = async (uri, filename, mimetype) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype || "application/octet-stream"
        ) // provide a default mimetype if not provided
          .then(async (createdUri) => {
            await FileSystem.writeAsStringAsync(createdUri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <View className="w-full h-[210px] bg-[#4080ED] px-[13px] space-y-2">
            <Text className="mt-[13px] font-semibold text-[22px] text-white">
              My Profile
            </Text>
            <View
              className="flex items-center justify-center"
              style={{ flex: 1 }}
            >
              <View className="w-full h-[140px] bg-white rounded-lg">
                <View className="flex  items-start flex-row  space-x-4 p-2">
                  <View className="h-[80px] w-[80px] bg-red-100 rounded-md overflow-hidden">
                    <TouchableOpacity
                      onPress={pickImage}
                      className="h-[80px] w-[80px] bg-red-100 rounded-md overflow-hidden"
                    >
                      {student?.avatar ? (
                        <Image
                          source={{ uri: student?.avatar?.url }}
                          className="w-[80px] h-[80px]"
                        ></Image>
                      ) : (
                        <Image
                          source={require("../../assets/Images/profile.webp")}
                          className="w-[80px] h-[80px]"
                        ></Image>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View>
                    {editMode ? (
                      <TextInput
                        value={formData.name}
                        onChangeText={(text) => handleChange("name", text)}
                        style={{ fontWeight: "bold", fontSize: 20 }}
                      />
                    ) : (
                      <Text className="font-semibold text-[#4080ED] text-lg">
                        {formData.name}
                      </Text>
                    )}
                    <Text className="capitalize">{formData.city}</Text>
                  </View>
                </View>
                <View className="flex flex-row items-center space-x-2">
                  {editMode ? (
                    <TouchableOpacity
                      onPress={handleSave}
                      className="flex flex-row bg-[#dde0e7de] w-[80px] ml-[11px] justify-center px-2 h-[33px] rounded-md items-center"
                    >
                      <EvilIcons name="pencil" size={24} color="#3A3D4F" />
                      <Text className="text-[#3A3D4F]">Save</Text>
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={handleEdit}
                        className="flex flex-row bg-[#dde0e7de] w-[80px] ml-[11px] justify-center px-2 h-[33px] rounded-md items-center"
                      >
                        <EvilIcons name="pencil" size={24} color="#3A3D4F" />
                        <Text className="text-[#3A3D4F]">Edit</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  <TouchableOpacity className="flex flex-row border-[1px] w-[180px] border-[#01C698] space-x-2 justify-center px-2 h-[33px] rounded-md items-center">
                    <FontAwesome name="whatsapp" size={20} color="#01C698" />
                    <Text className="text-[#01C698]">Share Resume</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <ScrollView>
            <View className="px-[13px] mt-[13px] ">
              <View className="flex flex-row items-center space-x-1 ">
                <Text className="font-semibold text-[16px]">
                  Personal Details
                </Text>
              </View>
              <View className="space-y-2 my-3">
                <View className="flex flex-row items-start gap-1 border-b-[.4px] border-gray-300 py-2">
                  <Octicons name="person" size={20} color="black" />
                  <View className="space-y-1">
                    <Text>Name</Text>
                    {editMode ? (
                      <TextInput
                        value={formData.name}
                        onChangeText={(text) => handleChange("name", text)}
                      />
                    ) : (
                      <Text className="text-[13px]">{formData.name}</Text>
                    )}
                  </View>
                </View>

                <View className="flex flex-row items-start gap-1 border-b-[.4px] border-gray-300 py-2">
                  <Feather name="phone" size={17} color="black" />
                  <View className="space-y-1">
                    <Text>Mobile Number</Text>
                    {editMode ? (
                      <TextInput
                        value={formData.contact}
                        onChangeText={(text) => handleChange("contact", text)}
                      />
                    ) : (
                      <Text className="text-[13px]">{formData.contact}</Text>
                    )}
                  </View>
                </View>

                <View className="flex flex-row items-start gap-1 border-b-[.4px] border-gray-300 py-2">
                  <AntDesign name="mail" size={20} color="black" />
                  <View className="space-y-1">
                    <Text>Email</Text>
                    {editMode ? (
                      <TextInput
                        value={formData.email}
                        onChangeText={(text) => handleChange("email", text)}
                      />
                    ) : (
                      <Text className="text-[13px]">{formData.email}</Text>
                    )}
                  </View>
                </View>

                <View className="flex flex-row items-start gap-1 border-b-[.4px] border-gray-300 py-2">
                  <Ionicons name="location-outline" size={20} color="black" />
                  <View className="space-y-1">
                    <Text>Location</Text>
                    {editMode ? (
                      <TextInput
                        value={formData.city}
                        onChangeText={(text) => handleChange("city", text)}
                      />
                    ) : (
                      <Text className="text-[13px] capitalize">
                        {formData.city}
                      </Text>
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => downloadResume(student?.resumePdf?.url)}
                  className="flex flex-row items-start gap-1 border-b-[.4px] border-gray-300 py-2"
                >
                  <AntDesign name="filetext1" size={20} color="black" />
                  <View className="space-y-1">
                    <Text>Preview Resume</Text>
                    <Text className="text-[13px]">See your Resume</Text>
                  </View>
                </TouchableOpacity>

                <DocumentUploadScreen></DocumentUploadScreen>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ProfileStudent;
