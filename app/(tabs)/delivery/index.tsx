import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableRipple } from 'react-native-paper';
import { Stack } from 'expo-router';
//ICON
import { EvilIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

// Define the types for the navigation routes
type RootStackParamList = {
  DeliveryScreen: undefined;
  DeliveryHistory: undefined;
  tutorial: undefined;
};

type DeliveryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeliveryScreen'>;

export default function DeliveryIndexScreen() {
  const navigation = useNavigation<DeliveryScreenNavigationProp>();
  const [showTooltip, setShowTooltip] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const handlePress = () => {
    setShowTooltip(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowTooltip(false);
          navigation.navigate('tutorial');
        });
      }, 1500);
    });
  };

  return (
    <LinearGradient colors={['#ffd4d1', '#f6f6f6']} locations={[0.0, 0.5]} style={styles.gradientContainer}>
      <Stack.Screen
        options={{
          headerTitle: 'Food Delivery',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // 배경색을 흰색 50% 투명도로 설정
          },
          headerRight: () => (
            <View>
              <TouchableRipple onPress={handlePress} rippleColor="rgba(0, 0, 0, .32)" borderless={true}>
                <View>
                  <FontAwesome name="question-circle-o" size={26} color="#f02f04" />
                </View>
              </TouchableRipple>
              {showTooltip && (
                <Animated.View style={[styles.tooltipContainer, { opacity: fadeAnim }]}>
                  <Text style={styles.tooltipText}>Learn More</Text>
                </Animated.View>
              )}
            </View>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('home' as never);
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={[styles.title, { marginBottom: 10 }]}>Try placing a</Text>
          <Text style={[styles.title, { marginBottom: 15 }]}>food delivery order!</Text>
          <Text style={{ marginBottom: 17, fontSize: 15 }}>For detailed instructions, please tap the ? button.</Text>
        </View>
        <View style={styles.infoContainer}>
          {/* 코드 : 나중에 음식점 정보 추가 -> 추천 */}
          <View
            style={{
              marginTop: 5,
              paddingBottom: 15,
              marginBottom: 20,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: 300 }}>Recommendation</Text>
          </View>
          <View style={styles.placeholder}>
            <Text>Restaurant information will go here</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DeliveryHistory')}>
            <Text style={styles.buttonText}>View my orders</Text>
          </TouchableOpacity>
          <View style={styles.buttonSpacing} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DeliveryScreen')}>
            <Text style={styles.buttonText}>Order food delivery</Text>
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
  tooltipContainer: {
    width: 80,
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'center',
    right: 30,
    top: 5,
  },
  tooltipText: {
    color: '#f02f04',
    fontSize: 14,
  },
  container: {
    flexGrow: 1,
    padding: 30,
    paddingTop: 120,
    paddingBottom: 150,
  },
  title: {
    width: '100%',
    alignSelf: 'flex-start',
    fontSize: 28,
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
    height: 500, // 세로 길이
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    // iOS 전용 그림자 속성
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 10 }, // 그림자 오프셋
    shadowOpacity: 0.1, // 그림자 불투명도
    shadowRadius: 5, // 그림자 블러 반경
    // Android 전용 그림자 속성
    elevation: 5, // 그림자의 깊이
    marginBottom: 30,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
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
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
