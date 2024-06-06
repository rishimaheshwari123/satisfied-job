import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Menu = () => {
  return (
    <View style={styles.menu}>
      {/* Your menu items here */}
      <View style={styles.menuBorder}>
        <Text>aaa</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    margin: 0,
    width: 32.05 * 16, // converting em to pixels
    fontSize: 1.5 * 16, // converting em to pixels
    paddingHorizontal: 2.85 * 16, // converting em to pixels
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#your_bg_color_here', // Set your background color here
    display: 'flex',
  },
  menuItem: {
    // Define your menu item styles here
  },
  menuBorder: {
    left: 0,
    bottom: '99%',
    width: 10.9 * 16, // converting em to pixels
    height: 2.4 * 16, // converting em to pixels
    position: 'absolute',
    // Clip-path is not supported in React Native directly
    backgroundColor: '#your_bg_color_here', // Set your background color here
    // You might need to handle the animation logic using libraries like Animated
  },
});

export default Menu;
