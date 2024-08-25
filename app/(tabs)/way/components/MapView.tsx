import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function MapView({ selectedRoute }: { selectedRoute: any }) {
  return (
    <View style={selectedRoute ? styles.mapContainer : styles.placeholderContainer}>
      {selectedRoute ? (
        // 지도 컴포넌트가 들어갈 곳
        <Text style={styles.mapText}>Map showing {selectedRoute.description}</Text>
      ) : (
        <Text style={styles.placeholderText}>지도 위치</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContainer: {
    flex: 2,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#000',
  },
});
