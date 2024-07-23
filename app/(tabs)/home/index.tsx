import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 justify-center items-center">
      <Stack.Screen options={{headerShown: false}}/>
      <Text className="text-3xl">HOME</Text>
    </View>
  )
}
