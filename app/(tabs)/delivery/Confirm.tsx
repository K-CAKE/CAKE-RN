import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  DeliveryScreen: undefined; // any도 됨
  Orders: undefined;
  DeliveryHistory: undefined;
  Confirm: undefined;
  index: undefined;
};

type ConfirmationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ConfirmationScreen() {
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#ffffff', '#f5f5f5']} style={styles.gradientContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: 'https://img.icons8.com/fluency/48/000000/ok.png' }}
            style={styles.icon}
          />
        </View>
        <Text style={styles.title}>Congratulations!!!</Text>
        <Text style={styles.subtitle}>Your order have been taken and is being attended to</Text>

        <TouchableOpacity
          style={styles.trackOrderButton}
          onPress={() => navigation.navigate('DeliveryHistory')}
        >
          <Text style={styles.trackOrderText}>Track order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('index')}
        >
          <Text style={styles.continueText}>Continue Delivery</Text>
        </TouchableOpacity> 
      </LinearGradient>
    </View>
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
    backgroundColor: '#E0F7EC',
    borderRadius: 50,
    padding: 20,
    marginBottom: 30,
  },
  icon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6E6E6E',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  trackOrderButton: {
    backgroundColor: '#FFA07A',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
  },
  trackOrderText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  continueButton: {
    borderWidth: 2,
    borderColor: '#FFA07A',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  continueText: {
    color: '#FFA07A',
    fontSize: 16,
  },
});
