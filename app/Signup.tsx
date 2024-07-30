import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

export default function Signup() {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const handleNameChange = (text: string) => {
    setName(text);
  };

  // 비밀번호 재입력 시 일치 확인
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (confirmPassword) {
      setPasswordMessage(text === confirmPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.');
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setPasswordMessage(text === password ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.');
  };

  // 회원가입 완료 알림 및 로그인 페이지 이동
  const handleSignup = () => {
    Alert.alert(`${name}님 만나서 반가워요!`, '로그인 페이지로 이동합니다.', [
      {
        text: '확인',
        onPress: () => router.push('/Login'),
      },
    ]);
  };

  return (
    <View className="flex-1 px-6 py-4 bg-white">
      <StatusBar style="light" />

      {/* 상단 문구 */}
      <Text className="mt-32 mb-6 text-3xl text-left">
        어서와 한국은 처음이지?{'\n'}
        배달과 택시 파트너입니다.
      </Text>
      <Text className="mt-6 mb-6 text-base text-left">먼저 회원가입을 해주세요 :)</Text>

      {/* 회원가입 폼 */}
      <View className="mb-4">
        <TextInput
          className="h-12 mb-2 text-gray-500 border-b border-gray-600"
          placeholder="이름"
          placeholderTextColor="gray"
          value={name}
          onChangeText={handleNameChange}
        />
        <TextInput
          className="h-12 mb-2 text-gray-500 border-b border-gray-600"
          placeholder="이메일"
          placeholderTextColor="gray"
        />
        <TextInput
          className="h-12 mb-2 text-gray-500 border-b border-gray-600"
          placeholder="비밀번호"
          secureTextEntry
          placeholderTextColor="gray"
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TextInput
          className="h-12 mb-0 text-gray-500 border-b border-gray-600"
          placeholder="비밀번호 확인"
          secureTextEntry
          placeholderTextColor="gray"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        {passwordMessage ? (
          <Text className={`text-xs mt-2 ${password === confirmPassword ? 'text-blue-500' : 'text-red-500'}`}>
            {passwordMessage}
          </Text>
        ) : null}
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity className="items-center justify-center bg-blue-500 rounded-lg h-14" onPress={handleSignup}>
        <Text className="text-xl font-bold text-white">회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}
