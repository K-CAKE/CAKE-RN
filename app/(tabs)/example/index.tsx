import { supabase } from '@/hooks/supabase';
// import { Platform, TextInput, View, Text } from 'react-native';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Button } from '@rneui/themed/dist/Button';
// import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
// import { useRecoilState } from 'recoil';
// import { userid } from '@/atoms/userState';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
// const redirectTo = makeRedirectUri();
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const theme = useTheme();
  // const [useridState] = useRecoilState(userid);
  // const [chatting, setChatting] = useState('');
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

  // const Updatetoken = async (text: string) => {
  //   const { error } = await supabase.from('chat').insert({ chatting: text });
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     // console.log('success');
  //   }
  // };
  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) return;

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    console.log(data.user);
    // setUseridState(data.user?.user_metadata);
    await setItem('access_token', data.session?.access_token ?? '');
    await setItem('refresh_token', data.session?.refresh_token ?? '');
    return data.session;
  };
  async function setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      return localStorage.setItem(key, value);
    }
    await AsyncStorage.setItem(key, value);
  }

  // const performOAuth = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'kakao',
  //     options: {
  //       redirectTo,
  //       skipBrowserRedirect: true,
  //     },
  //   });
  //   if (error) throw error;

  //   const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);

  //   if (res.type === 'success') {
  //     const { url } = res;
  //     await createSessionFromUrl(url);
  //   }
  // };
  // async function signOut() {
  //   await supabase.auth.signOut();
  //   // setUseridState('');
  //   await AsyncStorage.removeItem('access_token');
  //   await AsyncStorage.removeItem('refresh_token');
  // }

  const handleInserts = (payload: any) => {
    setChat([...chat, payload.new.chatting]);
    console.log('Change received!', payload);
  };
  supabase
    .channel('chat')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat' }, handleInserts)
    .subscribe();
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);
  return (
    <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
      Press me
    </Button>
    // <NaverMapView style={{ flex: 1 }} />
    // <View>
    //   <Button onPress={performOAuth}>Sign in with Kakao</Button>
    //   <Button onPress={signOut}>Sign out</Button>
    //   {chat.map((item, index) => (
    //     <Text key={index}>{item}</Text>
    //   ))}
    //   <View className={'mt-10'}>
    //     <TextInput
    //       onChangeText={(text) => {
    //         setChatting(text);
    //       }}
    //       placeholder="아무거나 입력해주세요."
    //     />
    //     <Button onPress={() => Updatetoken(chatting)} title="Send" />
    //   </View>
    // </View>
  );
}
