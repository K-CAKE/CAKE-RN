import { supabase } from '@/hooks/supabase';
import { View, Pressable, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, Stack, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from 'react-native-paper';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // const [useridState] = useRecoilState(userid);
  const [chat] = useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

  const navigation = useNavigation();

  const renderItem = () => {
    return (
      <View>
        {chat.map((item, index) => (
          <>
            <Link
              href={{
                pathname: '/(tabs)/chat/[id]',
                params: { id: index },
              }}
              className="border border-gray-300 p-4 my-2 rounded-lg"
            >
              <Text>Chat with user {item}</Text>
              <Badge visible={true} className="bg-red-500">
                3
              </Badge>
            </Link>
          </>
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
// import * as React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { Badge, IconButton, List, Paragraph, Switch, useTheme } from 'react-native-paper';

// const BadgeExample = () => {
//   const [visible, setVisible] = React.useState<boolean>(true);
//   const {
//     colors: { background },
//   } = useTheme();

//   return (
//     <View style={[styles.container, { backgroundColor: background }]}>
//       <View style={[styles.row, styles.item]}>
//         <Paragraph style={styles.label}>Show badges</Paragraph>
//         <Switch value={visible} onValueChange={(visible) => setVisible(visible)} />
//       </View>
//       <List.Section title="Text">
//         <View style={styles.row}>
//           <View style={styles.item}>
//             <IconButton icon="palette-swatch" size={36} style={styles.button} />
//             <Badge visible={visible} style={styles.badge}>
//               12
//             </Badge>
//           </View>
//           <View style={styles.item}>
//             <IconButton icon="inbox" size={36} style={styles.button} />
//             <Badge visible={visible} style={[styles.badge, { backgroundColor: 'red' }]}>
//               999+
//             </Badge>
//           </View>
//         </View>
//       </List.Section>
//       <List.Section title="Dot">
//         <View style={styles.row}>
//           <View style={styles.item}>
//             <IconButton icon="book-open" size={36} style={styles.button} />
//             <Badge visible={visible} style={styles.badge} size={8} />
//           </View>
//           <View style={styles.item}>
//             <IconButton icon="receipt" size={36} style={styles.button} />
//             <Badge visible={visible} style={styles.badge} size={8} />
//           </View>
//         </View>
//       </List.Section>
//     </View>
//   );
// };

// BadgeExample.title = 'Badge';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   item: {
//     margin: 16,
//   },
//   button: {
//     opacity: 0.6,
//   },
//   badge: {
//     position: 'absolute',
//     top: 4,
//     right: 0,
//   },
//   label: {
//     flex: 1,
//   },
// });

// export default BadgeExample;
