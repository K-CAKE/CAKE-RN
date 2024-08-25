import { Stack } from 'expo-router';

export default function DeliveryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Delivery Index' }} />
      <Stack.Screen name="DeliveryScreen" options={{ title: 'Delivery Details' }} />
      <Stack.Screen name="DeliveryHistory" options={{ title: 'Delivery History' }} />
      <Stack.Screen name="Confirm" options={{ title: 'Delivery Confirm' }} />
      <Stack.Screen name="DeliveryStatus" options={{ title: 'Delivery Status' }} />
      <Stack.Screen name="tutorial" options={{ title: 'Delivery Tutorial' }} />
      <Stack.Screen name="Address" options={{ title: 'Address' }} />
      <Stack.Screen name="DeliveryMap" options={{ title: 'DeliveryMap' }} />

    </Stack>
  );
}
