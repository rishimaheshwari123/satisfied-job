import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useUserLoggedIn } from "../constants/auth";
import { logoutStudent } from "../redux/action/studentAction";

const Setting = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userLoggedIn, setUserLoggedIn } = useUserLoggedIn();

  React.useEffect(() => {
    StatusBar.setBackgroundColor("#4080ED");
  }, []);

  const handleLogout = () => {
    dispatch(logoutStudent());
    setUserLoggedIn(false);
  };
  return (
    <View style={styles.container} className="space-y-4 flex flex-col">
      <TouchableOpacity>
        <View
          style={styles.option}
          className="bg-white py-[12px] rounded-lg px-1 justify-between"
        >
          <View className="flex items-center flex-row">
            <Image
              source={require("../../assets/settings/support.png")}
              className="w-[25px] h-[25px]"
            ></Image>
            <Text style={styles.optionText}>Change Number</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={styles.option}
          className="bg-white py-[12px] rounded-lg px-1 justify-between"
        >
          <View className="flex items-center flex-row">
            <Image
              source={require("../../assets/settings/language.png")}
              className="w-[25px] h-[25px]"
            ></Image>
            <Text style={styles.optionText}>Language</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={styles.option}
          className="bg-white py-[12px] rounded-lg px-1 justify-between"
        >
          <View className="flex items-center flex-row">
            <Image
              source={require("../../assets/settings/notification.png")}
              className="w-[24px] h-[24px]"
            ></Image>
            <Text style={styles.optionText}>Notification</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={styles.option}
          className="bg-white py-[12px] rounded-lg px-1 justify-between"
        >
          <View className="flex items-center flex-row">
            <Image
              source={require("../../assets/settings/support.png")}
              className="w-[24px] h-[24px]"
            ></Image>
            <Text style={styles.optionText}>Consumer Support</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={styles.option}
          className="bg-white py-[12px] rounded-lg px-1 justify-between"
        >
          <View className="flex items-center flex-row">
            <Image
              source={require("../../assets/settings/privacy.png")}
              className="w-[24px] h-[24px]"
            ></Image>
            <Text style={styles.optionText}>Privacy Polices</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={styles.option}
          className="bg-white py-[12px] rounded-lg px-1 justify-between"
        >
          <View className="flex items-center flex-row">
            <Image
              source={require("../../assets/settings/rating.png")}
              className="w-[24px] h-[24px]"
            ></Image>
            <Text style={styles.optionText}>Rating</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
          style={styles.option}
          className="bg-white py-[12px] rounded-lg px-1 justify-between"
        >
          <View className="flex items-center flex-row">
            <Image
              source={require("../../assets/settings/delete.png")}
              className="w-[24px] h-[24px]"
            ></Image>
            <Text style={styles.optionText}>Delete</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <View
          style={styles.option}
          className="bg-white py-[12px] rounded-lg px-1 justify-between"
        >
          <View className="flex items-center flex-row">
            <Image
              source={require("../../assets/settings/logout.png")}
              className="w-[23px] h-[23px]"
            ></Image>
            <TouchableOpacity style={styles.optionText}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F2F2F2",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 14,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default Setting;
