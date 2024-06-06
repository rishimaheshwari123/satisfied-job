import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "./Slider";

const YourComponent = () => {
  const [adds, setAdds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdds = async () => {
      try {
        const response = await axios.get(
          "https://api.satisfiedjob.com/employer/admin/adds/get",
          {
            headers: {
              authorization: await AsyncStorage.getItem("token"),
            },
          }
        );
        const data = response.data;
        if (data.success) {
          setAdds(data.adds);
        } else {
          setError("Failed to fetch data");
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchAdds();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Slider images={adds.map((add) => ({ uri: add.image }))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  image: {
    width: "92%",
    height: 200,
    marginBottom: 10,
  },
});

export default YourComponent;
