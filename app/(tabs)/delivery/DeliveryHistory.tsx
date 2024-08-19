import React, { useEffect, useState } from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { View, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 초기화
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const MyComponent = () => {
  const [cardCount, setCardCount] = useState(0);
  const [loading, setLoading] = useState(true);

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
    return <Text>데이터를 불러오는 중...</Text>; // 로딩 중 메시지
  }

  return (
    <ScrollView>
      {cardCount > 0 ? (
        Array.from({ length: cardCount }).map((_, index) => (
          <Card key={index} style={{ backgroundColor: '#FFD4D1', marginBottom: 10 }}>
            <Card.Title
              title={`카드 제목 ${index + 1}`}
              subtitle="카드 서브타이틀"
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
        ))
      ) : (
        <Text>해당 foreigner_id에 대한 데이터가 없습니다.</Text>
      )}
    </ScrollView>
  );
};

export default MyComponent;
