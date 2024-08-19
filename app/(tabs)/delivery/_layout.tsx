import { Stack } from 'expo-router';

export default function DeliveryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Delivery Index' }} />
      <Stack.Screen name="DeliveryScreen" options={{ title: 'Delivery Details' }} />
      <Stack.Screen name="Orders" options={{ title: 'Orders' }} />
      <Stack.Screen name="DeliveryHistory" options={{ title: 'Delivery History' }} />
      <Stack.Screen name="Confirm" options={{ title: 'Delivery Confirm' }} />
    </Stack>
  );
}
