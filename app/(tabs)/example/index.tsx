import { supabase } from '@/hooks/supabase';
import { Platform, TextInput, View, Text } from 'react-native';
// import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@rneui/themed/dist/Button';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import { useRecoilState } from 'recoil';
import { userid } from '@/atoms/userState';
import { useEffect, useState } from 'react';
import { NaverMapView } from '@mj-studio/react-native-naver-map';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

const redirectTo = makeRedirectUri();
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });
  const [useridState] = useRecoilState(userid);
  const [chatting, setChatting] = useState('');
  const [chat, setChat] = useState<string[]>([]);
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.idToken,
        });
        console.log(error, data);
      } else {
        throw new Error('no ID token present!');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
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
  const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);

    if (errorCode) throw new Error(errorCode);
    const { access_token, refresh_token } = params;

    if (!access_token) {
      throw new Error('No access_token in URL');
    }

    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (error) throw error;
    console.log(data);
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

  const performOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) throw error;
    console.log(data.url);
    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? '', redirectTo);
    console.log(res);
    if (res.type === 'success') {
      const { url } = res;
      await createSessionFromUrl(url);
    }
  };
  async function signOut() {
    await supabase.auth.signOut();
    // setUseridState('');
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
  }

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
    // <NaverMapView style={{ flex: 1 }} />
    <View>
      <Button onPress={signInWithGoogle}>Sign in with Google</Button>
      <Button onPress={signOut}>Sign out</Button>
      {chat.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
      <View className={'mt-10'}>
        <TextInput
          onChangeText={(text) => {
            setChatting(text);
          }}
          placeholder="아무거나 입력해주세요."
        />
        <Button onPress={() => Updatetoken(chatting)} title="Send" />
      </View>
    </View>
  );
}
