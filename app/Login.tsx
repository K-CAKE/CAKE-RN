import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* 로고 */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/strawberry-cake.png')} style={styles.topImage} resizeMode="contain" />
      </View>

      {/* 환영 문구 */}
      <Text style={styles.headerText}>
        Welcome! Is this your first time in Korea?{'\n'}
        We are your delivery and taxi partner.
      </Text>
      <Text style={styles.subHeaderText}>Please login first :)</Text>

      {/* 구글 로그인 버튼 */}
      <TouchableOpacity
        style={styles.googleLoginButton}
        onPress={() => {
          /* Google login logic */
        }}
      >
        <Image source={require('../assets/images/google_logo.png')} style={styles.googleLogo} />
        <Text style={styles.googleLoginText}>Google Login</Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => {
          router.push('/(tabs)/home' as never);
        }}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
          },
          styles.homeButton,
        ]}
      >
        <Text style={{ color: 'black', fontSize: 20 }}>로그인 없이 홈으로</Text>
      </Pressable>
      {/* 하단 문구 */}
      <Text style={styles.footerText}>
        By signing up, you agree to the CAKE{'\n'}Terms of Service and Privacy Policy.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: height * 0.05,
  },
  topImage: {
    width: width * 0.4,
    height: width * 0.4,
  },
  headerText: {
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
    fontSize: width * 0.05,
    textAlign: 'center',
  },
  subHeaderText: {
    marginTop: height * 0.02,
    marginBottom: height * 0.04,
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    height: height * 0.08,
    marginBottom: height * 0.04,
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
  footerText: {
    marginTop: height * 0.2,
    fontSize: width * 0.03,
    textAlign: 'center',
  },
  homeButton: {
    height: 30,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
