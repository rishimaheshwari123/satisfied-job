import React from 'react';
import { View } from 'react-native';

const Container = ({ children, bgColor }) => {
  return (
    <View style={{ backgroundColor: bgColor, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ maxWidth: '100%' }}>{children}</View>
    </View>
  );
};

export default Container;
