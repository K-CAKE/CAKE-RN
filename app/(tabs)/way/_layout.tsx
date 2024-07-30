import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="way" options={{ headerShown: false }} />
    </Stack>
  );
}