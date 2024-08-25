import { supabase } from '@/hooks/supabase';
import { View, Pressable, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Stack, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Badge, useTheme } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // const [useridState] = useRecoilState(userid);
  const [chat] = useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  const navigation = useNavigation();
  const {
    colors: { primary, secondary },
  } = useTheme();

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
            <Text>Chat with user {item}</Text>
            <Badge style={{ backgroundColor: primary, color: 'white', position: 'absolute', right: 10, top: 10 }}>
              3
            </Badge>
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
          style={{ paddingTop: 85 }}
          data={['']}
          renderItem={renderItem}
          // keyExtractor={(item) => item.key}
          ListFooterComponent={<View style={{ height: 300 }} />}
        />
      </View>
    </LinearGradient>
  );
}
