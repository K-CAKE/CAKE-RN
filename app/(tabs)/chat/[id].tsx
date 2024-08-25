import { supabase } from '@/hooks/supabase';
import { View, TextInput, Text, Pressable } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/atoms/userState';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const insets = useSafeAreaInsets();
  const [useridState] = useRecoilState(userState);
  const { id } = useLocalSearchParams();
  const [chatting, setChatting] = useState('');
  const [chat, setChat] = useState<any>([]);
  const [isUser1, setIsUser1] = useState(true);
  const [otherUser, setOtheruser] = useState<number | null | undefined>(0);
  useEffect(() => {
    const fetchChat = async () => {
      const { data, error } = await supabase.from('chat').select('chatting, is_user1').eq('chat_room', id);
      const { data: roomdata, error: roomerror } = await supabase
        .from('chat_room')
        .select('user1, user2')
        .eq('id', id)
        .maybeSingle();
      setIsUser1(useridState.id === roomdata?.user1);
      setOtheruser(roomdata?.user2);
      if (error || roomerror) {
        console.log(error);
      } else {
        setChat(
          data.map((item, idx) => ({
            chatting: item.chatting?.toString() || '',
            user: useridState.id === roomdata?.user1 && item.is_user1 ? 'me' : 'user' + roomdata?.user2,
          })),
        );
      }
    };
    fetchChat();
  }, [id, useridState.id]);

  const Updatetoken = async (text: string) => {
    const { error } = await supabase.from('chat').insert({ chatting: text, is_user1: isUser1, chat_room: Number(id) });
    if (error) {
      console.log(error);
    } else {
      setChat([...chat, { chatting, user: 'me' }]);
      setChatting('');
    }
  };

  const handleInserts = (payload: any) => {
    setChat([...chat, { chatting: payload.new.chatting, user: 'user2' }]);
    // console.log('Change received!', payload);
  };

  supabase
    .channel('chat')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, handleInserts)
    .subscribe();
  const navigation = useNavigation();

  const renderItem = () => {
    return (
      <View style={{ gap: 4 }}>
        {chat.length ? (
          chat.map((item: any, index: number) => (
            <View key={index} className="mx-3">
              {item.user === 'me' ? (
                <>
                  <Text className="ml-auto">me</Text>
                  <View className="mx-2 bg-red-500 p-2 text-xl rounded-md ml-auto w-auto max-w-40">
                    <Text className="text-white">{item.chatting}</Text>
                  </View>
                </>
              ) : (
                <>
                  <Text>{item.user}</Text>
                  <View className="mx-2 bg-red-200 p-2 text-xl rounded-md mr-auto w-auto max-w-40">
                    <Text>{item.chatting}</Text>
                  </View>
                </>
              )}
            </View>
          ))
        ) : (
          <View className="items-center">
            <Text>{'no chat'}</Text>
          </View>
        )}
      </View>
    );
  };
  return (
    <LinearGradient colors={['#ffd4d1', '#efefef']} locations={[0.0, 0.5]} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: 'Chat With User' + otherUser,
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
                navigation.goBack();
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
          style={{ paddingTop: 140 }}
          data={['']}
          renderItem={renderItem}
          inverted
          ListFooterComponent={<View style={{ height: 250 }} />}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: 130,
          backgroundColor: 'white',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 80 - insets.bottom,
        }}
      >
        <TextInput
          value={chatting}
          onChangeText={(text) => setChatting(text)}
          placeholder="아무거나 입력해주세요."
          className="w-3/4 px-3 border border-gray-300 mx-1"
        />
        <Button onPress={() => Updatetoken(chatting)} icon="send" mode="contained" textColor="white">
          send
        </Button>
      </View>
    </LinearGradient>
  );
}
