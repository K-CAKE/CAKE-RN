import React, { useEffect, useState } from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View, ScrollView, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
//ICON
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || ''; // as string 붙여도됨
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Supabase 클라이언트 초기화
const MyComponent = () => {
  const router = useRouter();
  const [cardCount, setCardCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [iconToggle, setToggle] = useState(true);
  useEffect(() => {
    // foreigner_id가 2인 food_request_history 레코드 수 가져오기
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('food_request_history')
        .select('*', { count: 'exact' })
        .eq('foreigner_id', 2);

      if (error) {
        console.error('데이터 가져오기 에러:', error);
      } else {
        console.log('가져온 데이터:', data);
        setCardCount(data.length); // 매칭되는 레코드 수 설정
      }
      setLoading(false); // 로딩 상태 업데이트
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
      <ScrollView
        style={{ paddingTop: 120, paddingBottom: 150, paddingLeft: 15, paddingRight: 15, backgroundColor: '#f3f3f3' }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}>
          <Text style={{ fontSize: 24, fontWeight: 600, paddingLeft: 5 }}>My orders</Text>
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
        {cardCount > 0 ? (
          Array.from({ length: cardCount }).map((_, index) => (
            <Card key={index} style={styles.card}>
              <LinearGradient
                locations={[1, 0.5]}
                colors={['#feeceb', '#ffff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              >
                <Card.Title
                  title={`카드 제목 ${index + 1}`}
                  subtitle="카드 서브타이틀"
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
          ))
        ) : (
          <Text>해당 foreigner_id에 대한 데이터가 없습니다.</Text>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  card: {
    shadowColor: 'transparent', // 그림자의 색상을 투명하게 설정
    shadowOffset: { width: 0, height: 0 }, // 그림자의 오프셋을 0으로 설정
    shadowOpacity: 0, // 그림자의 투명도를 0으로 설정
    shadowRadius: 0, // 그림자의 블러 반경을 0으로 설정
    // Android에서 그림자를 제거합니다.
    elevation: 0, // 그림자의 깊이를 0으로 설정
    backgroundColor: '#FFD4D1',
    marginBottom: 10,
  },
});
export default MyComponent;
