import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WidgetSuccess: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Widget Payment Successful!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'green',
  },
});

export default WidgetSuccess;
