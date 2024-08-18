import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Text, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/hooks/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as QueryParams from 'expo-auth-session/build/QueryParams';

const { width, height } = Dimensions.get('window');

const redirectTo = makeRedirectUri();
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;
    // console.log(data.url);
    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);

    // console.log(res);
    if (res.type === 'success') {
      const { url } = res;
      await createSessionFromUrl(url);
    }
    router.push('/(tabs)/home');
  };
  async function setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      return localStorage.setItem(key, value);
    }
    await AsyncStorage.setItem(key, value);
  }
  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);
    if (errorCode) throw new Error(errorCode);
    console.log(params);
    const { access_token, refresh_token } = params;

    if (!access_token) {
      throw new Error('No access_token in URL');
    }

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    await setItem('access_token', data.session?.access_token ?? '');
    await setItem('refresh_token', data.session?.refresh_token ?? '');
    return data.session;
  };

  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

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
          performOAuth();
        }}
      >
        <Image source={require('../assets/images/google_logo.png')} style={styles.googleLogo} />
        <Text style={styles.googleLoginText}>Google Login</Text>
      </TouchableOpacity>

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
});
