import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/cake_logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TouchableOpacity
        style={styles.googleLoginButton}
        onPress={() => {
          /* Google login logic */
          router.push('/home'); // 로그인 성공 후 홈 화면으로 이동
        }}
      >
        <Image source={require('../assets/images/google_logo.png')} style={styles.googleLogo} />
        <Text style={styles.googleLoginText}>Google Login</Text>
      </TouchableOpacity>
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
  logo: {
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
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
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
});
