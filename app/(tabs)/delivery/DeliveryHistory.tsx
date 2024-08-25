import React, { useEffect, useState } from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View, ScrollView, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
//ICON
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MyComponent = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [iconToggle, setToggle] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('food_request_history')
        .select('*')
        .eq('foreigner_id', 2);

      if (error) {
        console.error('데이터 가져오기 에러:', error);
      } else {
        setOrders(data || []);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#F02F04" />
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Order History',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
      <ScrollView
        style={{ paddingTop: 120, paddingBottom: 150, paddingLeft: 15, paddingRight: 15, backgroundColor: '#f3f3f3' }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
          <Text style={{ fontSize: 24, fontWeight: '600', paddingLeft: 5 }}>My orders</Text>
          <Pressable
            onPress={() => {
              setToggle(!iconToggle);
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
              },
              { alignSelf: 'flex-end' },
            ]}
          >
            {!iconToggle ? (
              <MaterialCommunityIcons name="sort-clock-descending-outline" size={25} color="gray" />
            ) : (
              <MaterialCommunityIcons name="sort-clock-ascending-outline" size={25} color="gray" />
            )}
          </Pressable>
        </View>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <View key={index} style={styles.cardContainer}>
              <Text style={styles.dateText}>{new Date(order.processing_date).toLocaleDateString()}</Text>
              <Card
                style={styles.card}
                onPress={() => {
                  router.push(`/delivery/DeliveryStatus?food_request_id=${order.food_request_id}`);
                }}
              >
                <LinearGradient
                  locations={[1, 0.5]}
                  colors={['#feeceb', '#ffff']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                >
                  <Card.Title
                    title={order.food_name}
                    subtitle={order.request_position}
                    left={(props) => (
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Avatar.Icon
                          {...props}
                          icon={() => <Ionicons name="fast-food" size={24} color="#f02f04" />}
                          style={{ backgroundColor: '#feeceb' }}
                        />
                      </View>
                    )}
                    right={(props) => <IconButton {...props} icon="dots-vertical" iconColor="gray" onPress={() => {}} />}
                  />
                </LinearGradient>
              </Card>
            </View>
          ))
        ) : (
          <Text>해당 foreigner_id에 대한 데이터가 없습니다.</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
    marginLeft: 10,
  },
  gradient: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  card: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    backgroundColor: '#FFD4D1',
  },
});

export default MyComponent;
