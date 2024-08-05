import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import { NaverMapView } from '@mj-studio/react-native-naver-map';

export default function Step2Screen() {
  const router = useRouter();
  return (
    <View style={styles.block}>
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerLeft: () => (
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
          ),
        }}
      />
      <View style={styles.mapView}>
        <NaverMapView style={styles.map} />
      </View>
      <View style={styles.detail}></View>
      <Pressable
        onPress={() => {
          router.push('/taxi/step3' as never);
        }}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
          },
          styles.nextButton,
        ]}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  back: {
    borderRadius: 100,
    backgroundColor: 'white',
    width: 30,
    height: 30,
  },
  mapView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    backgroundColor: 'lightgray',
  },
  map: {
    flex: 1,
  },
  detail: {
    flex: 1,
    backgroundColor: 'white',
  },
  nextButton: {
    borderRadius: 30,
    width: '90%',
    height: 50,
    backgroundColor: '#F02F04',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
