import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Animated, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

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
    <LinearGradient colors={['#ffafbd', '#ffc3a0']} style={styles.gradient}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Animated.View style={[styles.imageContainer, { transform: [{ translateY }] }]}>
          <Image style={styles.image} source={require('../assets/images/cake_logo.png')} resizeMode="contain" />
        </Animated.View>

        <Text style={styles.headerText}>Welcome! 1st time in Korea?{'\n'}Delivery & taxi partner.</Text>

        <TouchableOpacity onPress={() => router.push('/Login')} style={styles.googleLoginButton}>
          <Image source={require('../assets/images/google_logo.png')} style={styles.googleLogo} />
          <Text style={styles.googleLoginText}>Google Login</Text>
        </TouchableOpacity>
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
    marginBottom: height * 0.04,
    fontSize: width * 0.05,
    textAlign: 'center',
    color: 'black',
    lineHeight: height * 0.04,
  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 60,
    height: height * 0.08,
    width: width * 0.8,
    maxWidth: 360,
    marginTop: height * 0.1,
  },
  googleLogo: {
    width: width * 0.08,
    height: width * 0.08,
    marginRight: width * 0.03,
  },
  googleLoginText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: 'black',
  },
});
