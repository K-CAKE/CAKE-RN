import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Animated, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

const { width, height } = Dimensions.get('window');

export default function Index() {
  // 로고 애니메이션
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 15,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [translateY]);

  return (
    <LinearGradient colors={['#ffff', '#f02f04']} locations={[0.2, 1]} style={styles.gradient}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Animated.View style={[styles.imageContainer, { transform: [{ translateY }] }]}>
          <Image style={styles.image} source={require('../assets/images/cake_logo.png')} resizeMode="contain" />
        </Animated.View>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 1 }}>
          <Text style={styles.headerText}>
            <Text style={{ fontSize: 40, fontWeight: 600 }}>Welcome!{'\n\n'}</Text>Connecting You with Helpers{'\n'} for
            Your Rides and Deliveries!
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'black',
            marginTop: 50,
            width: width * 0.33,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 50,
            // iOS 전용 그림자 속성
            shadowColor: '#000', // 그림자 색상
            shadowOffset: { width: 0, height: 10 }, // 그림자 오프셋
            shadowOpacity: 0.07, // 그림자 불투명도
            shadowRadius: 5, // 그림자 블러 반경
            // Android 전용 그림자 속성
            elevation: 3, // 그림자의 깊이
          }}
        >
          <TouchableOpacity onPress={() => router.push('/Login')} style={styles.googleLoginButton}>
            <Text style={styles.googleLoginText}>Start now</Text>
            <Feather name="arrow-up-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  imageContainer: {
    width: width * 0.48,
    aspectRatio: 1,
    marginBottom: height * 0.05,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerText: {
    paddingTop: 20,
    marginBottom: height * 0.04,
    fontSize: width * 0.045,
    textAlign: 'center',
    color: 'black',
    lineHeight: height * 0.04,
    fontWeight: 'semibold',
  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLoginText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'white',
  },
});
