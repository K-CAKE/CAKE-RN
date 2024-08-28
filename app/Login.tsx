import React from 'react';
import { Pressable, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, TextInput } from 'react-native';
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
        }}
      >
        <Image source={require('../assets/images/google_logo.png')} style={styles.googleLogo} />
        <Text style={styles.googleLoginText}>Google Login</Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => {
          router.push('/home');
        }}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
          },
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Text style={{ fontSize: 15, textDecorationLine: 'underline' }}>로그인없이 홈으로</Text>
      </Pressable>
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
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
    marginBottom: height * 0.05,
    width: width * 0.3,
    height: width * 0.3,
    elevation: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 100,
  },
  logo: {
    width: width * 0.33,
    height: width * 0.33,
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
    backgroundColor: 'white',
    borderColor: 'lightgray',
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
    borderColor: 'lightgray',
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
