// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { RecoilRoot } from 'recoil';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

// import DeliveryScreen from '@/app/(tabs)/delivery';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    primary: '#F02F04',
    secondary: '#FFD4D1',
    third: '#FEECEB',
  },
};
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
      <PaperProvider theme={theme}>
        <RecoilRoot>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Login" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="Signup" options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(history)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </RecoilRoot>
      </PaperProvider>
    </GestureHandlerRootView>
    // </ThemeProvider>
  );
}
