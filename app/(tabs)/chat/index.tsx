import { supabase } from '@/hooks/supabase';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Badge, useTheme } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { useRecoilState } from 'recoil';
import { userState } from '@/atoms/userState';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [useridState] = useRecoilState(userState);
  const [chat, setChat] = useState<string[]>([]);
  const navigation = useNavigation();
  const {
    colors: { primary, secondary },
  } = useTheme();
  useEffect(() => {
    const fetchChat = async () => {
      const { data: data, error: roomerror } = await supabase
        .from('chat_room')
        .select('user1, user2, id')
        .eq('user1', useridState.id);
      if (roomerror) {
        console.log(roomerror);
      } else {
        setChat(data.map((item: any, idx) => item.id));
      }
    };
    fetchChat();
  }, [useridState.id]);
  const renderItem = () => {
    return (
      <View>
        {chat.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => router.push(`/(tabs)/chat/${item}`)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? secondary : 'transparent',
              },
              { borderBottomColor: 'gray', borderBottomWidth: 1, padding: 4, height: 60, justifyContent: 'center' },
            ]}
          >
            <Text>Chatting room {item}</Text>
            <Badge
              style={{ backgroundColor: primary, color: 'white', position: 'absolute', right: 10, top: 10 }}
              size={4}
            ></Badge>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#ffd4d1', '#efefef']} locations={[0.0, 0.5]} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: 'Chat List',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // 배경색을 흰색 50% 투명도로 설정
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigation.navigate('home' as never);
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
      <View style={styles.block}>
        <FlatList
          style={{ paddingTop: 85 }}
          data={['']}
          renderItem={renderItem}
          ListFooterComponent={<View style={{ height: 300 }} />}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  block: { flex: 1 },
});
