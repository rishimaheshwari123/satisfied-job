import React, { useState } from "react";
import { View, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  TouchableOpacity,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

const UploadAvatar = ({ data, upload }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      dispatch(upload(result));
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <GestureHandlerRootView>
      <TouchableOpacity onPress={pickImage}>{data}</TouchableOpacity>
    </GestureHandlerRootView>
  );
};

export default UploadAvatar;
