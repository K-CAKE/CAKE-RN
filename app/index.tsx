import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Animated, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function Index() {
  // 온보딩 이미지 애니메이션
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

  // 문구 타이핑 애니메이션
  const [displayedText, setDisplayedText] = useState<string>('');
  const fullText = "I'M YOUR SUPPOTER";
  const typingSpeed = 100;

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const typeText = (index: number) => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        timer = setTimeout(() => typeText(index + 1), typingSpeed);
      }
    };

    typeText(0);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  // main code
  return (
    <LinearGradient colors={['#ffafbd', '#ffc3a0']} className="items-center justify-center flex-1">
      <StatusBar style="light" />
      <View className="flex items-center justify-center w-full mt-28">
        <Animated.View style={{ transform: [{ translateY }] }} className="w-[40%] aspect-square mb-10">
          <Image
            style={{ width: '100%', height: '100%' }}
            source={require('../assets/images/strawberry-cake.png')}
            resizeMode="contain"
          />
        </Animated.View>

        <View className="flex items-center w-full max-w-lg mb-6 mt-28">
          <Text className="text-2xl font-bold tracking-wide text-black">{displayedText}</Text>
        </View>
        <View className="flex items-center w-full max-w-lg">
          <TouchableOpacity
            // 로그인 페이지로 이동
            onPress={() => router.push('/Login')}
            className="bg-rose-400 h-16 w-full max-w-xs justify-center rounded-full border-[3px]"
          >
            <Text className="text-2xl font-bold tracking-wide text-center text-black">START</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
