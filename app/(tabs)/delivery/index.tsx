import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

// Define the types for the navigation routes
type RootStackParamList = {
  DeliveryScreen: undefined;
  DeliveryHistory: undefined;
};

type DeliveryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeliveryScreen'>;

export default function DeliveryIndexScreen() {
  const navigation = useNavigation<DeliveryScreenNavigationProp>();

  return (
    <LinearGradient colors={['#F02F04', '#F5ECEA']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          Step 3 : 네이버 맵 api 를 통해 음식점 추천 받아서 order 하는 방식
        </Text>
        <View style={styles.infoContainer}>
          {/* 코드 : 나중에 음식점 정보 추가 -> 추천 */}
          <Text>외부 VIEW</Text>

          <View style={styles.placeholder}>
            <Text>Restaurant information will go here</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DeliveryHistory')}
          >
            <Text style={styles.buttonText}>View my orders</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpacing} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DeliveryScreen')}
          >
            <Text style={styles.buttonText}>Order delivery</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 15,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    height: 500, // 세로 길이
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholder: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonSpacing: {
    height: 10, // 버튼 사이의 간격을 주기 위해 추가된 높이
  },
  button: {
    backgroundColor: '#F02F04', // 버튼 색상 변경
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // 둥근 버튼
    width: '80%', // 버튼 너비 조정
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
