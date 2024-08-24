import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  DeliveryScreen: undefined;
  Orders: undefined;
  DeliveryHistory: undefined;
  Confirm: undefined;
  index: undefined;
  DeliveryStatus: undefined;
};

type ConfirmationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ConfirmationScreen() {
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Confirm Order',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // 배경색을 흰색 50% 투명도로 설정
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesome name="paper-plane" size={50} color="#F02F04" />
        </View>
        <Text style={styles.title}>Congratulations!</Text>
        <View style={{ marginTop: 15, marginBottom: 45 }}>
          <Text style={[styles.subtitle, { marginBottom: 12 }]}>Your order have been taken</Text>
          <Text style={styles.subtitle}>and is being attended to</Text>
        </View>
        <View style={{}}>
          <TouchableOpacity style={styles.trackOrderButton} onPress={() => navigation.navigate('DeliveryStatus')}>
            <Text style={styles.trackOrderText}>Track order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('index')}>
            <Text style={styles.continueText}>Continue Delivery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: '#FFD4D1',
    borderRadius: 50,
    padding: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6E6E6E',
    textAlign: 'center',
  },
  trackOrderButton: {
    backgroundColor: '#F02f04',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    alignContent: 'center',
  },
  trackOrderText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
  },
  continueButton: {
    borderWidth: 2,
    borderColor: '#f02f04',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  continueText: {
    textAlign: 'center',
    color: '#F02f04',
    fontSize: 16,
  },
});
