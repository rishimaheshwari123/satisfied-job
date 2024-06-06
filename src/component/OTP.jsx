import React, { useEffect, useState } from "react";
import { BackHandler, Dimensions, ToastAndroid } from "react-native";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { submitOtpEmployer } from "../redux/action/employeeAction";
import { setError } from "../redux/sclice/employeeSclice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const OTPInputModal = ({ visible, onClose, scrollTo, setModalVisible }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { employee, error, loading } = useSelector((e) => e.employee);
  const { width } = Dimensions.get("window");
  const [otp, setOTP] = useState("");

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch(setError(null));
    }
  }, [error]);

  const handleSubmit = () => {
    dispatch(submitOtpEmployer({ activationCode: otp }));
  };

  useEffect(() => {
    if (employee) {
      scrollTo(0 + 1 * width);
      setModalVisible(false);
    }
  }, [employee, handleSubmit]);

  const handleBackButton = async () => {
    await AsyncStorage.removeItem("token");
    onClose();
  };

  /* TODO */
  /* Remove otp screen on click of back btn */

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {loading ? (
        <>Loading....</>
      ) : (
        <View style={styles.container}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={async () => {
                await AsyncStorage.removeItem("token");
                onClose();
              }}
            >
              <Icon name="close-outline" size={24} color="#888" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              value={otp}
              onChangeText={(text) => setOTP(text)}
              maxLength={6}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 200,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default OTPInputModal;
