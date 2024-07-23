import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router"

export default function Index() {

  // 라우터 선언
  const router = useRouter();
  
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
      ])
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

    return () => { if (timer) { clearTimeout(timer);} };
  }, []);

  // main code
  return (
    <View className="flex items-center justify-center flex-1 bg-white">
      <StatusBar style="light"/>
      <Animated.Image 
        style={{ width: 160, height: 160, transform: [{ translateY }] }}
        className="w-40 h-40 bottom-10" 
        source={require('../assets/images/strawberry-cake.png')}
      />

      <LinearGradient colors={['transform']} className='absolute bottom-0 left-0 right-0 p-4'>
        <View className='flex items-center mb-6'>
          <Text className='text-2xl font-bold tracking-wide text-black'>
            {displayedText}
          </Text>
        </View>
        <View className='w-full max-w-[500px] items-center'>
          <TouchableOpacity
          // 로그인 페이지로 이동
          onPress={()=> router.push('Login')} 
          className='bg-rose-400 flex h-16 w-[300px] mb-16 justify-center rounded-full border-[3px]'>
            <Text className='text-2xl font-bold tracking-wide text-center text-black'>
              START
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}