import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter, useLocalSearchParams } from 'expo-router';
//Icon
import { Ionicons } from '@expo/vector-icons';
//Map
import { NaverMapView } from '@mj-studio/react-native-naver-map';
//ChatingButton
import ChatButton from './ChatButton';

export default function Step3Screen() {
  const router = useRouter();
  return (
    <View style={styles.block}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.mapView}>
          <NaverMapView style={styles.map} />
          <Pressable
            onPress={() => {
              router.back();
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 0.9,
              },
              styles.back,
            ]}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </Pressable>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}></View>
        </ScrollView>
      </View>
      <ChatButton />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    borderRadius: 100,
    backgroundColor: 'white',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    // iOS 전용 그림자 속성
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 10 }, // 그림자 오프셋
    shadowOpacity: 0.07, // 그림자 불투명도
    shadowRadius: 5, // 그림자 블러 반경
    // Android 전용 그림자 속성
    elevation: 3, // 그림자의 깊이
    position: 'absolute',
    top: 30,
    left: 25,
  },
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
    height: '50%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});
