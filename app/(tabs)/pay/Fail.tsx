import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Fail: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Failed</Text>
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
    color: 'red',
  },
});

export default Fail;
