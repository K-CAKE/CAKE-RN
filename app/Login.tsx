import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';

export default function Login() {
  return (
    <View className="flex-1 px-6 py-4 bg-white">
      <StatusBar style="light" />
      {/* 상단 문구 */}
      <Text className="text-3xl text-left mb-6 mt-32">
        어서와 한국은 처음이지?{'\n'}
        배달과 택시 파트너입니다.
      </Text>
      <Text className="text-base text-left mt-6 mb-6">먼저 로그인이 필요해요 :)</Text>
      {/* 아이디와 비밀번호 입력 */}
      <View className="mb-4">
        <TextInput
          className="h-12 border-b border-gray-600 text-gray-500 mb-2"
          placeholder="아이디"
          placeholderTextColor="gray"
        />
        <TextInput
          className="h-12 border-b border-gray-600 text-gray-500 mb-6"
          placeholder="비밀번호"
          secureTextEntry
          placeholderTextColor="gray"
        />
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity
        className="bg-rose-400 h-14 rounded-lg justify-center items-center mb-20"
        onPress={() => router.push('/home')}
      >
        <Text className="text-black text-xl font-bold">로그인</Text>
      </TouchableOpacity>

      {/* 간편 로그인 */}
      <View className="flex-row items-center mb-6">
        <View className="flex-1 border-t border-gray-400" />
        <Text className="text-base mx-4 text-center  text-gray-500">간편 로그인</Text>
        <View className="flex-1 border-t border-gray-400" />
      </View>

      {/* 구글 로그인 */}
      <TouchableOpacity
        className="bg-white h-14 rounded-lg justify-center items-center mb-14 flex-row border border-gray-800"
        onPress={() => {
          /* Google login logic */
        }}
      >
        <Image source={require('../assets/images/google_logo.png')} className="w-6 h-6 mr-3" />
        <Text className="text-black text-xl font-bold">구글 아이디로 로그인</Text>
      </TouchableOpacity>

      <Text className="text-base text-center text-gray-500 mb-4">처음이신가요?</Text>

      {/* 회원가입 버튼 */}
      <TouchableOpacity
        className="bg-blue-500 h-14 rounded-lg justify-center items-center mb-4"
        onPress={() => router.push('/Signup')}
      >
        <Text className="text-white text-xl font-bold">회원가입</Text>
      </TouchableOpacity>

      {/* 하단 문구 */}
      <Text className="text-xs text-center mt-auto mb-6">
        회원가입 시 CAKE 서비스 이용 약관과 개인정보 보호 정책에 동의하게 됩니다.
      </Text>
    </View>
  );
}
