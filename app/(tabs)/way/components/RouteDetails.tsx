import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { NaverMapView } from '@mj-studio/react-native-naver-map';

export default function RouteDetails({ route }: { route: any }) {
  return (
    <View style={styles.container}>
      {/* 상단 지도 */}
      {/* <NaverMapView
            style={styles.map}
            layerGroups={{
              MOUNTAIN: false,
              CADASTRAL: false,
              BICYCLE: false,
              BUILDING: true,
              TRAFFIC: true,
              TRANSIT: true,
            }}
            initialRegion={{
              latitude: 37.3851,
              longitude: 127.1238,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          /> */}
      {/* 하단 경로 상세 정보 */}
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.detailText}>time: {route.duration}minute</Text>
        <Text style={styles.detailText}>money: {route.fare}원</Text>
        <Text style={styles.routeDescription}>{route.description}</Text>

        {/* 경로 상세 단계 */}
        {route.steps?.map((step: any, index: number) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepText}>
              Step {index + 1}: {step.instruction}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  routeDescription: {
    fontSize: 16,
    marginBottom: 15,
  },
  stepContainer: {
    marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#555',
  },
});
