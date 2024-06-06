import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { useUserLoggedIn } from "../constants/auth";
import { logoutStudent } from "../redux/action/studentAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
export default function Example({ navigation, route }) {
  const { student, error, loading } = useSelector((e) => e.student);

  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const { userLoggedIn, setUserLoggedIn } = route.params || {};

  const dispatch = useDispatch();

  const Logout = async () => {
    dispatch(logoutStudent());
    setUserLoggedIn(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: student?.avatar?.url,
                }}
                style={styles.profileAvatar}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileStudent")}
              >
                <View style={styles.profileAction}>
                  <FeatherIcon color="#fff" name="edit-3" size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName} className="capitalize">
              {student?.name}
            </Text>

            <Text style={styles.profileAddress}>{student?.email}</Text>
          </View>
        </View>

        <ScrollView className="">
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("ProfileStudent")}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#fe9400" }]}>
                <FeatherIcon color="#fff" name="globe" size={14} />
              </View>
              <Text style={styles.rowLabel}>Profile</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>

            <TouchableOpacity onPress={Logout} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
                <AntDesign name="logout" size={14} color="#fff" />
              </View>
              <Text style={styles.rowLabel}>Logout</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>

            <TouchableOpacity onPress={Logout} style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: "#38C959" }]}>
                <MaterialCommunityIcons
                  name="database-arrow-down"
                  size={14}
                  color="#fff"
                />
              </View>
              <Text style={styles.rowLabel}>Update Password</Text>
              <View style={styles.rowSpacer} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PrivacyPolicy");
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <MaterialIcons name="local-police" size={14} color="#fff" />
              </View>

              <Text style={styles.rowLabel}>Polices</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={14} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("About");
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#007afe" }]}>
                <Feather name="info" size={14} color="#fff" />
              </View>

              <Text style={styles.rowLabel}>About Us</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={14} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.row}
            >
              <View style={[styles.rowIcon, { backgroundColor: "#32c759" }]}>
                <FeatherIcon color="#fff" name="star" size={14} />
              </View>

              <Text style={styles.rowLabel}>Rate in App Store</Text>

              <View style={styles.rowSpacer} />

              <FeatherIcon color="#C6C6C6" name="chevron-right" size={14} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAvatar: {
    width: 65,
    height: 65,
    borderRadius: 9999,
  },
  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 14,
    color: "#989898",
    textAlign: "center",
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 40,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 8,
  },
  rowIcon: {
    width: 25,
    height: 25,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "400",
    color: "#0c0c0c",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
