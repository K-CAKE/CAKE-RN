import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name="Payment" options={{ title: 'Payment' }} />
    </Stack>
  );
}
