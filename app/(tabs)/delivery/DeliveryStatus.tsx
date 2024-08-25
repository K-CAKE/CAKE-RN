import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';
import { useRouter, useLocalSearchParams } from 'expo-router';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function DeliveryStatusScreen() {
  const { food_request_id } = useLocalSearchParams();
  const router = useRouter();
  const [requestState, setRequestState] = useState(0);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    console.log('Received food_request_id:', food_request_id); // food_request_id 확인

    const fetchRequestState = async () => {
      const { data, error } = await supabase
        .from('food_request_history')
        .select('*')
        .eq('food_request_id', food_request_id)
        .single();

      if (error) {
        console.error('Error fetching request state:', error);
      } else {
        console.log('Fetched order data:', data); // 가져온 데이터 확인
        setRequestState(data?.request_state || 0);
        setOrderData(data);
      }
    };

    fetchRequestState();
  }, [food_request_id]);

  return (
    <LinearGradient colors={['#ffffff', '#f5f5f5']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Button
            icon="arrow-left"
            mode="text"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            Go back
          </Button>
          <Text style={styles.headerText}>Delivery Status</Text>
        </View>

        {requestState >= 0 && (
          <View style={styles.statusContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/order-delivered.png' }}
                style={styles.statusIcon}
              />
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Order Taken</Text>
              <FontAwesome name="check-circle" size={24} color="green" />
            </View>
          </View>
        )}

        {requestState >= 1 && (
          <View style={styles.statusContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/cooking-book.png' }}
                style={styles.statusIcon}
              />
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Order Is Being Prepared</Text>
              <FontAwesome name="check-circle" size={24} color="green" />
            </View>
          </View>
        )}

        {requestState >= 2 && (
          <View style={styles.statusContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/scooter.png' }}
                style={styles.statusIcon}
              />
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Order Is Being Delivered</Text>
              <Text style={styles.statusSubtitle}>Your delivery agent is coming</Text>
              <FontAwesome name="phone" size={24} color="orange" />
            </View>
          </View>
        )}

        {requestState >= 3 && (
          <View style={styles.statusContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/checked.png' }}
                style={styles.statusIcon}
              />
            </View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>Order Received</Text>
              <FontAwesome name="check-circle" size={24} color="green" />
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA07A',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 15,
  },
  statusIcon: {
    width: 50,
    height: 50,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});
