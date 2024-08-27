import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Address: { deliveryDestination: string };
  DeliveryScreen: undefined;
  DeliveryHistory: undefined;
  Confirm: undefined;
  DeliveryStatus: undefined;
  tutorial: undefined;
  DeliveryMap: undefined;
  index: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeliveryMap'>;

export default function DeliveryMap() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    getNowLocation();
  }, []);

  async function getNowLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    if (location) {
      setLocation(location);
      const { longitude, latitude } = location.coords;
      getAddress(longitude, latitude);
    }
  }

  async function getAddress(long: number, lat: number) {
    const url = `https://apis.vworld.kr/coord2jibun.do?x=${long}&y=${lat}&output=json&apiKey=${process.env.EXPO_PUBLIC_GEO_API_KEY}`;
    try {
      const { data } = await axios.get(url);
      if (data && data.ADDR) {
        setAddress(data.ADDR);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.log('Error:', error);
      setAddress('Error fetching address');
    }
  }

  const handleRegisterAddress = () => {
    if (address) {
      navigation.navigate('Address', { deliveryDestination: address });
    } else {
      console.log('Address not found');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        {location && (
          <NaverMapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          />
        )}
        <TouchableOpacity style={styles.refreshButton} onPress={getNowLocation}>
          <MaterialIcons name="location-searching" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{address || 'Fetching address...'}</Text>
        <TouchableOpacity style={styles.registerButton} onPress={handleRegisterAddress}>
          <Text style={styles.registerButtonText}>이 위치로 주소 등록</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  refreshButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addressContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    marginBottom: 50, // 버튼이 하단 바에 의해 가림 -> 여백 추가
  },
  addressText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#F02F04',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
