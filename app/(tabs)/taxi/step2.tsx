import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter, useLocalSearchParams } from 'expo-router';
//Icon
import { Ionicons } from '@expo/vector-icons';
//Map
import { NaverMapView } from '@mj-studio/react-native-naver-map';
//Fare
import { calculateTaxiFare } from './TaxiFareCalculator';

export default function Step2Screen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  // 출발지 도착지
  const [arrival, setArrival] = useState<any>(null);
  const [dep, setDep] = useState<any>(null);
  // 거리
  const [distance, setDistance] = useState<number | null>(null);
  // 예상시간
  const [time, setTime] = useState<number | null>(null);
  // 예상택시비
  const [fare, setFare] = useState<number | null>(null);
  // 택시비 계산
  // 기본요금(4800원) + 거리요금(0.131km당 100원) + (거리(km)/14.6(km/h))/35(s)*100(원)
  useEffect(() => {
    if (params) {
      //임시로 거리 설정(27km)
      setArrival(params.Arrival);
      setDep({
        latitude: params.Dep[0],
        longitude: params.Dep[1],
      });
      console.log(dep);
      setDistance(27);
      try {
        const calculateFare = calculateTaxiFare(distance);
        setFare(Math.floor(calculateFare));
      } catch (error) {
        console.log('계산 에러 발생');
        setFare(null);
      }
    }
  }, [params]);
  return (
    <View style={styles.block}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <View style={styles.mapView}>
          <NaverMapView
            style={styles.map}
            layerGroups={{
              CADASTRAL: false,
              BICYCLE: false,
              BUILDING: true,
              TRAFFIC: true,
              TRANSIT: true,
            }}
          />
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
          <View>
            <View style={styles.title}>
              <Text style={{ fontSize: 40, fontWeight: 'bold', marginRight: 8 }}>30</Text>
              <Text style={{ fontSize: 20, marginRight: 20 }}>minutes</Text>
              <Text
                style={{
                  fontSize: 15,
                  color: 'gray',
                  borderLeftWidth: 1,
                  borderLeftColor: 'lightgray',
                  paddingLeft: 15,
                }}
              >
                27
              </Text>
              <Text style={{ fontSize: 15, color: 'gray' }}>km</Text>
            </View>
            <View style={styles.detail}>
              <Text>
                Arrival: {arrival} Dep: {dep}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 18 }}>Estimated taxi fare :</Text>
                <Text>{fare}</Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
              <Text style={{ color: 'white', fontSize: 20 }}>Call taxi</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
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
  detail: {
    padding: 10,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 13,
    paddingTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  nextButton: {
    borderRadius: 30,
    width: '86%',
    height: 50,
    backgroundColor: '#F02F04',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
