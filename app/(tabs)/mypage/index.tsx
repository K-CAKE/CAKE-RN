import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
export default function Page() {
  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <Text>Mypage</Text>
    </View>
  );
}
