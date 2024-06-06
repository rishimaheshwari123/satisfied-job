// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import Loading from "../component/Loading";
import { useNavigation } from "@react-navigation/native";

import {
  avatarEmployee,
  updateEmployee,
  setError, // assuming setError is imported from your actions
} from "../redux/action/employeeAction";

// ProfileEmployee component
const ProfileEmployee = () => {
  // Hooks for managing state and navigation
  const navigation = useNavigation();
  const { employee, loading, error } = useSelector((e) => e.employee);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    contact: "1234567890",
    organisationname: "sss",
    website: "",
    socialMedia: "",
    location: "",
    industry: "",
    companySize: "",
  });

  // Effect hook to update form data when employee data changes
  useEffect(() => {
    if (employee) {
      setFormData({
        firstname: employee?.firstname,
        lastname: employee?.lastname,
        email: employee?.email,
        contact: employee?.contact,
        organisationname: employee?.organisationname,
        website: employee?.website || "",
        socialMedia: employee?.socialMedia || "",
        location: employee?.location || "",
        industry: employee?.industry || "",
        companySize: employee?.companySize || "",
      });
    }
  }, [employee]);

  // Effect hook to handle error messages
  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch(setError(null));
    }
  }, [error]);

  // Function to handle edit mode
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to handle save mode
  const handleSave = () => {
    setEditMode(false);
    dispatch(updateEmployee(formData));
  };

  // Function to handle form field changes
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Effect hook to set status bar color
  React.useEffect(() => {
    StatusBar.setBackgroundColor("#4080ED");
  }, []);

  // State hook for image
  const [image, setImage] = useState(null);

  // Function to pick image from gallery
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

    setImage(result.uri);
    dispatch(avatarEmployee(avatarFile));
  };

  // JSX structure
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Profile header */}
          <View className="w-full h-[170px]  bg-[#4080ED] px-[13px] space-y-2">
            {/* Profile information */}
            <Text className="mt-[13px] font-semibold text-[22px] relative text-white">
              My Profile
            </Text>
            <View className="flex items-center justify-center ">
              <View className="w-full h-[102px] bg-white rounded-lg">
                <View className="flex  items-start flex-row  space-x-4 p-2">
                  <View className="h-[80px] w-[80px]  rounded-md">
                    <TouchableOpacity
                      onPress={pickImage}
                      className="w-[80px] h-[80px]"
                    >
                      {employee?.organisationlogo?.url ? (
                        <Image
                          source={{ uri: employee?.organisationlogo?.url }}
                          className="w-[85px] h-[85px]"
                        />
                      ) : (
                        <Image
                          source={require("../../assets/Images/profile.webp")}
                          className="w-[85px] h-[85px]"
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  <View>
                    {/* Display name and organization */}
                    <Text className="font-semibold capitalize text-[#4080ED] text-[14px]">
                      {editMode ? (
                        <TextInput
                          value={formData.firstname}
                          onChangeText={(text) =>
                            handleChange("firstname", text)
                          }
                        />
                      ) : (
                        formData.firstname
                      )}{" "}
                      {editMode ? (
                        <TextInput
                          value={formData.lastname}
                          onChangeText={(text) =>
                            handleChange("lastname", text)
                          }
                        />
                      ) : (
                        formData.lastname
                      )}
                    </Text>
                    <Text className="capitalize text-[13px]">
                      {editMode ? (
                        <TextInput
                          value={formData.organisationname}
                          onChangeText={(text) =>
                            handleChange("organisationname", text)
                          }
                        />
                      ) : (
                        formData.organisationname
                      )}
                    </Text>
                    <Text className="capitalize text-[13px]">
                      {editMode ? (
                        <TextInput
                          value={formData.location}
                          onChangeText={(text) =>
                            handleChange("location", text)
                          }
                          className="capitalize"
                        />
                      ) : (
                        formData.location
                      )}
                    </Text>
                  </View>

                  <View className="flex flex-row items-center space-x-2 absolute right-1 top-2 ">
                    {editMode ? (
                      <TouchableOpacity onPress={handleSave}>
                        <AntDesign name="edit" size={20} color="#3A3D4F" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={handleEdit}>
                        <AntDesign name="edit" size={20} color="#3A3D4F" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Scrollable content */}
          <ScrollView>
            {/* Personal Details */}
            <View className="px-[13px] mt-[13px]  overscroll-scroll">
              <View className="flex flex-row items-center space-x-1 ">
                <Text className="font-semibold text-[16px]">
                  Personal Details
                </Text>
              </View>
              <View className="space-y-2 my-3">
                {/* Repeat similar pattern for other fields */}
                <View className="flex flex-row items-start gap-1 border-b-[.4px] border-gray-300 py-2">
                  <Octicons name="person" size={20} color="black" />
                  <View className="space-y-1">
                    <Text>Name</Text>
                    {editMode ? (
                      <TextInput
                        value={formData.firstname}
                        onChangeText={(text) => handleChange("firstname", text)}
                      />
                    ) : (
                      <Text className="text-[13px]">
                        {formData.firstname} {formData.lastname}
                      </Text>
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
                  <AntDesign name="earth" size={20} color="black" />
                  <View className="space-y-1">
                    <Text>Website</Text>
                    {editMode ? (
                      <TextInput
                        value={formData.website}
                        onChangeText={(text) => handleChange("website", text)}
                      />
                    ) : (
                      <Text className="text-[13px]">{formData.website}</Text>
                    )}
                  </View>
                </View>

                <View className="flex flex-row items-start gap-1 border-b-[.4px] border-gray-300 py-2">
                  <AntDesign name="instagram" size={20} color="black" />
                  <View className="space-y-1">
                    <Text>Social Media</Text>
                    {editMode ? (
                      <TextInput
                        value={formData.socialMedia}
                        onChangeText={(text) =>
                          handleChange("socialMedia", text)
                        }
                      />
                    ) : (
                      <Text className="text-[13px]">
                        {formData.socialMedia}
                      </Text>
                    )}
                  </View>
                </View>

                <View className="flex flex-row items-start gap-1 border-b-[.4px] border-gray-300 py-2">
                  <FontAwesome5 name="building" size={20} color="black" />
                  <View className="space-y-1">
                    <Text>Industry</Text>
                    {editMode ? (
                      <TextInput
                        value={formData.industry}
                        onChangeText={(text) => handleChange("industry", text)}
                      />
                    ) : (
                      <Text className="text-[13px]">{formData.industry}</Text>
                    )}
                  </View>
                </View>

                <View className="flex flex-row items-start gap-1 border-b-[.4px] border-gray-300 py-2">
                  <Feather name="users" size={20} color="black" />
                  <View className="space-y-1">
                    <Text>Team Size</Text>
                    {editMode ? (
                      <TextInput
                        value={formData.companySize}
                        onChangeText={(text) =>
                          handleChange("companySize", text)
                        }
                      />
                    ) : (
                      <Text className="text-[13px]">
                        {formData.companySize}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

// Export the component
export default ProfileEmployee;
