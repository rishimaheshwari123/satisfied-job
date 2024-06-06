import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import COLORS from "../constants/colors";
const Header = ({ navigation, isLogin }) => {
  return (
    <View className="w-[100%] relative px-[0.5px] py-2">
      <View className="flex flex-row align-center justify-between h-fit">
        <View className=" flex flex-row align-center justify-center my-auto ">
          <Text className="pt-[2px]">
            <Text
              style={{ color: `${COLORS.primary}` }}
              className={`uppercase font-semibold`}
            >
              SATISFIED
            </Text>
            JOB
          </Text>
        </View>
        <View className="flex flex-row w-fit  capitalize"></View>
      </View>
    </View>
  );
};

export default Header;
