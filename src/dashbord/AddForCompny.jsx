import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";

const AddForCompny = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const renderDetailsModal = () => {
    if (!selectedProduct) return null;
    return (
      <Modal
        visible={selectedProduct !== null}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Product: {selectedProduct}</Text>
            <Text style={styles.modalText}>
              Price: ₹{getFakePrice(selectedProduct)}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedProduct(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const getFakePrice = (productType) => {
    // Return fake price based on product type
    switch (productType) {
      case "Silver":
        return "100";
      case "Gold":
        return "200";
      case "Diamond":
        return "500";
      default:
        return "N/A";
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setSelectedProduct("Silver")}
      >
        <Text style={styles.cardText}>Silver</Text>
        <Text style={styles.cardText}>Price: ₹{getFakePrice("Silver")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setSelectedProduct("Gold")}
      >
        <Text style={styles.cardText}>Gold</Text>
        <Text style={styles.cardText}>Price: ₹{getFakePrice("Gold")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => setSelectedProduct("Diamond")}
      >
        <Text style={styles.cardText}>Diamond</Text>
        <Text style={styles.cardText}>Price: ₹{getFakePrice("Diamond")}</Text>
      </TouchableOpacity>
      {renderDetailsModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: 300,
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#4080ED",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddForCompny;
