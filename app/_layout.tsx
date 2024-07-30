// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { RecoilRoot } from 'recoil';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import DeliveryScreen from '@/app/(tabs)/delivery';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Pretendard-Black.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <GestureHandlerRootView>
      <RecoilRoot>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Login" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="Signup" options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="Delivery" options={{ headerShown: false }} />
          <Stack.Screen name="Orders" options={{ headerShown: false }} />
          <Stack.Screen name="OrderDelivery" options={{ headerShown: false }} />
        </Stack>
      </RecoilRoot>
    </GestureHandlerRootView>
    // </ThemeProvider>
  );
}
