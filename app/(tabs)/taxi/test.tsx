import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Pressable } from 'react-native';
import axios from 'axios';

import { Stack } from 'expo-router';
import { useRouter, useLocalSearchParams } from 'expo-router';
//Icon
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

//Map
import { NaverMapMarkerOverlay, NaverMapPathOverlay, NaverMapView } from '@mj-studio/react-native-naver-map';

// API KEY
const ID = process.env.EXPO_PUBLIC_NAVER_MAP_KEY;
const SECRE = process.env.EXPO_PUBLIC_NAVER_MAP_SECRET;

//type
type Coord = [number, number];
type Coords = { latitude: number; longitude: number };

// (lng, lat) 순서의 좌표를 (lat, lng) 순서로 변환하는 함수
const convertCoordinates = (coords: Coord[]): Coords[] => {
  return coords.map(([lng, lat]) => ({
    latitude: lat,
    longitude: lng,
  }));
};

const Test: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // 거리
  const [distance, setDistance] = useState<number | null>(null);
  // 예상시간
  const [hours, getHours] = useState<number>(0);
  const [minutes, getMinutes] = useState<number>(0);
  // 예상택시비
  const [fare, setFare] = useState<number | null>(null);
  const [path, getPath] = useState<Coord[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [start, setStart] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [getCode, setCode] = useState<number | null>(null);

  const [result, setResult] = useState<Coords[]>([]);
  const [startCoord, setStartCoord] = useState<Coords>({ latitude: 0, longitude: 0 });
  const [goalCoord, setGoalCoord] = useState<Coords>({ latitude: 0, longitude: 0 });

  function millisecondsTo(milli: number) {
    const totalMinutes = Math.floor(milli / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    getHours(hours);
    getMinutes(minutes);
  }

  function resetData() {
    setResult([]);
    getPath(undefined);
    setCode(null);
    setLoading(true);
  }
  /*
  function splitAndConvertToFloat(input: string): [number, number] {
    const numbers = input.split(',').map((num) => parseFloat(num));

    if (numbers.length !== 2) {
      throw new Error('출발지/도착지 위도 경도 값이 잘못 입력되었습니다.');
    }

    return [numbers[0], numbers[1]];
  }
*/
  useEffect(() => {
    if (params) {
      setStart(params.Arrival as string); // 서현역
      setGoal(params.Dep as string); // 중앙대학교 후문
    } else {
      console.log('Error: no params');
    }
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${start}&goal=${goal}&option=trafast`,
          {
            headers: {
              'X-NCP-APIGW-API-KEY-ID': `${ID}`,
              'X-NCP-APIGW-API-KEY': `${SECRE}`,
            },
          },
        );

        const data = response.data;
        if (data) {
          setCode(data.code);
          getPath(data.route.trafast[0].path);
          const result = convertCoordinates(data.route.trafast[0].path);
          setResult(result);
          setFare(data.route.trafast[0].summary.taxiFare.toLocaleString('ko-KR'));
          setDistance(Math.floor(data.route.trafast[0].summary.distance / 1000));
          millisecondsTo(data.route.trafast[0].summary.duration);
          setLoading(false);
        } else {
          console.log(`Load Error : code ${data}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };
    if (start && goal && !path) {
      console.log('확인용 출력 : API 호출');
      fetchData();
    }
  }, [start, goal]);

  //출발지 도착지 정확한 위도 경도 값 얻기 위함
  useEffect(() => {
    if (result?.length > 0) {
      setStartCoord(result[0]);
      setGoalCoord(result[result.length - 1]);
    }
  }, [result]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#F02F04" />
      </View>
    );
  }
  if (error) return <Text>Error: {JSON.stringify(error)}</Text>;

  return (
    <View style={styles.block}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        {!loading && getCode === 0 && result?.length > 0 ? (
          <>
            <View style={styles.mapView}>
              <NaverMapView
                style={styles.map}
                layerGroups={{
                  MOUNTAIN: false,
                  CADASTRAL: false,
                  BICYCLE: false,
                  BUILDING: true,
                  TRAFFIC: false,
                  TRANSIT: true,
                }}
                initialRegion={{
                  latitude: startCoord.latitude,
                  longitude: startCoord.longitude,
                  latitudeDelta: 0.07,
                  longitudeDelta: 0.07,
                }}
              >
                <NaverMapPathOverlay coords={result} width={8} color={'red'} progress={0} passedColor={'green'} />
              </NaverMapView>
              <Pressable
                onPress={() => {
                  resetData();
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
                  {hours === 0 ? (
                    <>
                      <Text style={{ fontSize: 40, fontWeight: 'bold', marginRight: 8 }}>{minutes}</Text>
                      <Text style={{ fontSize: 20, marginRight: 20 }}>min</Text>
                    </>
                  ) : (
                    <>
                      <Text style={{ fontSize: 35, fontWeight: 'bold', marginRight: 8 }}>{hours}</Text>
                      <Text style={{ fontSize: 18, marginRight: 10, alignSelf: 'flex-end', paddingBottom: 5 }}>hr</Text>

                      <Text style={{ fontSize: 35, fontWeight: 'bold', marginRight: 8 }}>{minutes}</Text>
                      <Text style={{ fontSize: 18, marginRight: 20, alignSelf: 'flex-end', paddingBottom: 5 }}>
                        min
                      </Text>
                    </>
                  )}
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'gray',
                      borderLeftWidth: 1,
                      borderLeftColor: 'lightgray',
                      paddingLeft: 15,
                    }}
                  >
                    {distance}
                  </Text>
                  <Text style={{ fontSize: 15, color: 'gray' }}>km</Text>
                </View>
                <View style={styles.detail}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, alignSelf: 'center', marginRight: 10 }}>Estimated taxi fare :</Text>
                    <Text style={{ fontSize: 18, alignSelf: 'center' }}>{fare}</Text>
                    <Text style={{ fontSize: 13, alignSelf: 'center', color: 'gray', marginLeft: 10 }}>Won</Text>
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
          </>
        ) : (
          <Text>No data</Text>
        )}
      </View>
    </View>
  );
};

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

export default Test;

/*
                <NaverMapMarkerOverlay
                  latitude={startCoord.latitude}
                  longitude={startCoord.longitude}
                  onTap={() => console.log('start')}
                  anchor={{ x: 0, y: 0 }}
                  width={100}
                  height={100}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: 'white',
                      borderRadius: 100,
                      borderColor: 'black',
                      borderWidth: 3,
                    }}
                  />
                </NaverMapMarkerOverlay>
                <NaverMapMarkerOverlay
                  latitude={goalCoord.latitude}
                  longitude={goalCoord.longitude}
                  onTap={() => console.log('start')}
                  anchor={{ x: 0, y: 0.2 }}
                  width={100}
                  height={100}
                  caption={{ text: 'Start', align: 'BottomLeft' }}
                >
                  <FontAwesome5 name="map-marker-alt" size={30} color="black" />
                </NaverMapMarkerOverlay>


*/
