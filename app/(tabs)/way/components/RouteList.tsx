import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function RouteList({ routes, onSelectRoute }: { routes: any[]; onSelectRoute: (route: any) => void }) {
  return (
    <View style={styles.container}>
      {routes.map((route) => (
        <TouchableOpacity key={route.id} onPress={() => onSelectRoute(route)} style={styles.routeItem}>
          <Text style={styles.routeText}>{route.description}</Text>
          <Text style={styles.routeInfo}>time: {route.duration}minute</Text>
          <Text style={styles.routeInfo}>money: {route.fare}원</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  routeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 15,
  },
  routeText: {
    fontSize: 16,
    color: '#333',
  },
  routeInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
