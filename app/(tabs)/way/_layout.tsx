import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 10 }}>
      <Text style={{ color: '#007aff' }}>Back</Text>
    </TouchableOpacity>
  );
}

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Way',
          headerLeft: () => <BackButton />,
        }}
      />
      {/* 다른 화면도 같은 옵션을 적용하려면 추가 */}
      {/* <Stack.Screen name="OtherScreen" options={{ title: 'Way' }} /> */}
    </Stack>
  );
}
