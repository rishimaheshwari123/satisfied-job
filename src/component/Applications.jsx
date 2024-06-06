import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateStatus } from "../redux/action/employeeAction";
import Placeholder from "./Placeholder";
import LottieView from "lottie-react-native";

const TableItem = ({ item, onUpdateStatus, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FFC107"; // Yellow
      case "Accepted":
        return "#4CAF50"; // Green
      case "Rejected":
        return "#F44336"; // Red
      default:
        return "#FFFFFF"; // Default color
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(item.status);

  const dispatch = useDispatch();

  const statusOptions = ["Pending", "Accepted", "Rejected"];

  const handleStatusChange = ({ status, id }) => {
    setSelectedStatus(status);
    setShowDropdown(false);
    onUpdateStatus(status);
    dispatch(updateStatus({ id, status }));
  };

  const rowColor = index % 2 != 0 ? "#ffedd5" : "#fff"; // Alternate row color

  return (
    <View style={[styles.row, { backgroundColor: rowColor }]}>
      <View style={[styles.cell, { width: 150 }]}>
        <Text style={styles.cellText}>
          {item.studentId ? `${item?.studentId?.name}` : "N/A"}
        </Text>
      </View>
      <View style={[styles.cell, { width: 200 }]}>
        <Text style={styles.cellText}>
          {item.studentId ? item?.studentId?.email : "N/A"}
        </Text>
      </View>
      <View style={[styles.cell, { width: 120 }]}>
        <Text style={styles.cellText}>
          {item.studentId ? item?.studentId?.contact : "N/A"}
        </Text>
      </View>
      <View style={[styles.cell, { width: 200 }]}>
        <Text style={styles.cellText}>
          {item?.jobId ? item?.jobId?.title : "N/A"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL(item.studentId.resumePdf.url + "pdf")}
        style={[styles.cell, { width: 200 }]}
      >
        <Text style={styles.cellText}>{item?.jobId ? "View" : "N/A"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.cell, { width: 120, alignItems: "center" }]}
        onPress={() => setShowDropdown(true)}
      >
        <Text
          style={[styles.cellText, { color: getStatusColor(item?.status) }]}
        >
          {selectedStatus}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showDropdown}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDropdown(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dropdown}>
            {statusOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() =>
                  handleStatusChange({ status: option, id: item._id })
                }
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ResponsiveTable = ({ data }) => {
  const updateStatus = (status) => {};

  return (
    <>
      {data.length == 0 ? (
        <View className="w-full h-[300px]" style={styles.animationContainer}>
          <LottieView
            source={require("../../assets/gfg/g4.json")}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
      ) : (
        <ScrollView horizontal={true} vertical={true} style={styles.scrollView}>
          <View style={styles.container}>
            <View style={[styles.row, styles.header]}>
              <View style={[styles.cell, { width: 150 }]}>
                <Text style={styles.headerText}>Name</Text>
              </View>
              <View style={[styles.cell, { width: 200 }]}>
                <Text style={styles.headerText}>Email</Text>
              </View>
              <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.headerText}>Contact</Text>
              </View>
              <View style={[styles.cell, { width: 200 }]}>
                <Text style={styles.headerText}>Job Title</Text>
              </View>
              <View style={[styles.cell, { width: 200 }]}>
                <Text style={styles.headerText}>Resume</Text>
              </View>
              <View style={[styles.cell, { width: 120 }]}>
                <Text style={styles.headerText}>Status</Text>
              </View>
            </View>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <TableItem
                  item={item}
                  onUpdateStatus={updateStatus}
                  index={index}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#000",
  },
  cell: {
    textAlign: "center",
    paddingVertical: 10,
    borderColor: "#000",
  },
  cellText: {
    textAlign: "center",
  },
  header: {
    backgroundColor: "#075985",
  },
  headerText: {
    fontWeight: "500",
    textAlign: "center",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: "80%", // 80% of screen width
    height: "80%", // 80% of screen height
  },
  // Your existing styles for table and modal
});

export default ResponsiveTable;
