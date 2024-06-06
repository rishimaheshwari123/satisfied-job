import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";

const Slider = ({ images, autoplayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (currentIndex < images.length - 1) {
        flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        flatListRef.current.scrollToIndex({ index: 0 });
        setCurrentIndex(0);
      }
    }, autoplayInterval);

    return () => clearInterval(autoplay);
  }, [currentIndex, images.length, autoplayInterval]);

  const renderItem = ({ item }) => (
    <Image source={item} style={styles.image} resizeMode="cover" />
  );

  const dotPosition = Animated.divide(scrollX, Dimensions.get("window").width);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        ref={flatListRef}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View key={index} style={[styles.dot, { opacity }]} />
          );
        })}
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height: 140, // Adjust height as needed
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#888",
    marginHorizontal: 5,
  },
});

export default Slider;
