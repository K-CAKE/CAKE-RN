import { supabase } from '@/hooks/supabase';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router, Stack, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // const [useridState] = useRecoilState(userid);
  const [chatting, setChatting] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  useEffect(() => {
    const fetchChat = async () => {
      const { data, error } = await supabase.from('chat').select('chatting');
      if (error) {
        console.log(error);
      } else {
        setChat(data.map((item) => item.chatting?.toString() ?? ''));
      }
    };
    fetchChat();
  }, []);

  const Updatetoken = async (text: string) => {
    const { error } = await supabase.from('chat').insert({ chatting: text });
    if (error) {
      console.log(error);
    } else {
      // console.log('success');
    }
  };

  const handleInserts = (payload: any) => {
    setChat([...chat, payload.new.chatting]);
    console.log('Change received!', payload);
  };

  supabase
    .channel('chat')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, handleInserts)
    .subscribe();
  const navigation = useNavigation();

  const renderItem = () => {
    return (
      <View>
        {chat.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
        <Link
          href={{
            pathname: '/(tabs)/chat/[id]',
            params: { id: '1' },
          }}
        >
          View user details
        </Link>
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
          headerRight: () => (
            <Pressable
              onPress={() => {
                console.log('question button');
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <FontAwesome name="question-circle-o" size={26} color="#f02f04" />
            </Pressable>
          ),
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

      <View>
        <FlatList
          style={{ paddingTop: 120 }}
          data={['']}
          renderItem={renderItem}
          // keyExtractor={(item) => item.key}
          ListFooterComponent={<View style={{ height: 300 }} />}
        />
      </View>
    </LinearGradient>
  );
}
