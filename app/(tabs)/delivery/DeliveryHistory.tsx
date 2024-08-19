import React, { useEffect, useState } from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Supabase initialization 공식 문서 코드에서 as string 만 추가
//  typescript를 사용할 것이기 때문에 불러올 데이터의 타입도 함께 지정
// Read all rows - supabase 홈페이지 > api docs > tables and views > product 코드 참조

// let { data: food_request_history, error } = await supabase
//   .from('food_request_history')
//   .select('*')

// Read specific columns
// let { data: food_request_history, error } = await supabase
//   .from('food_request_history')
//   .select('some_column,other_column')

// Read referenced tables
// let { data: food_request_history, error } = await supabase
//   .from('food_request_history')
//   .select(`
//     some_column,
//     other_table (
//       foreign_key
//     )
//   `)

// With pagination
// let { data: food_request_history, error } = await supabase
//   .from('food_request_history')
//   .select('*')
//   .range(0, 9)
// food_request_history 테이블의 데이터 타입 정의
type FoodRequestHistory = {
  food_request_id: string;
  request_state: string;
  request_price: string;
  food_payment: string;
  processing_date: string;
  serial_number: string;
  korean_id: number;
  foreigner_id: number;
  food_request_name: string;
};

const FoodRequestHistoryList = () => {
  const [foodRequests, setFoodRequests] = useState<FoodRequestHistory[]>([]);

  useEffect(() => {
    getFoodRequests();
  }, []);

  const getFoodRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('food_request_history')
        .select('*')
        .eq('foreigner_id', 2); // foreigner_id가 2인 데이터만 가져옴

      if (error) throw error;

      if (data) {
        setFoodRequests(data);
        console.log('가져온 데이터:', data);
      }
    } catch (error) {
      console.error('예상치 못한 문제가 발생하였습니다:', error);
    }
  };

  return (
    <ScrollView>
      <View style={{ flexDirection: 'column', gap: 10, padding: 20 }}>
        {foodRequests.map((foodRequest, index) => (
          <Card key={index} style={{ backgroundColor: '#FFD4D1', marginBottom: 10 }}>
            <Card.Title
              title={foodRequest.food_request_name}
              subtitle={`가격: ${foodRequest.request_price}원`}
              left={(props) => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Avatar.Icon
                    {...props}
                    icon={() => <Ionicons name="fast-food" size={24} color="white" />}
                    style={{ backgroundColor: '#F02F04' }}
                  />
                </View>
              )}
              right={(props) => (
                <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
              )}
            />
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

export default FoodRequestHistoryList;
