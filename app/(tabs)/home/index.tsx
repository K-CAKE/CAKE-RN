import { Stack, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, Pressable, View, Dimensions, ScrollView, Animated, Easing } from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

//ICON
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useNavigation } from 'expo-router';

//I,age
import CustomImage from '../../../components/CustomImage'; // CustomImage 컴포넌트 import
import ChatImage from './Chat-pana.png';
import TaxiImage from './City driver-pana.png';
import DeliveryImage from './Take Away-rafiki.png';

type RootStackParamList = {
  Payment: undefined;
};

export default function Page() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const [paddingTop, setPaddingTop] = useState(0);
  const { height } = Dimensions.get('window');
  const buttonHeight = ((3 / 5) * height) / 4;

  const navigation = useNavigation();

  const handlePress = (screen: string) => {
    navigation.navigate(screen as never);
  };
  useEffect(() => {
    setPaddingTop(headerHeight);
  }, [headerHeight]);

  return (
    <LinearGradient colors={['#F02F04', '#F5ECEA']} style={[styles.block, { paddingTop }]}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerLeft: () => (
            <Svg width={23} height={23} viewBox="0 0 23 23">
              <Path
                d="M6.10892 4.03538C8.30163 -0.453042 14.6984 -0.453054 16.8911 4.03536L21.5716 13.6163C23.5189 17.6022 20.6167 22.25 16.1806 22.25H6.81944C2.38329 22.25 -0.518867 17.6023 1.42837 13.6163L6.10892 4.03538Z"
                fill="#FFD4D1"
              />
            </Svg>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                console.log('user button');
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <FontAwesome name="user-circle" size={35} color="#FFD4D1" />
            </Pressable>
          ),
          headerTitle: '',
        }}
      />
      <View style={styles.paypal}>
        <View style={styles.top}>
          <Text style={[styles.text, { fontSize: 15 }]}>My berry balance</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.balance}>$ 0.00</Text>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                router.push('/home/Payment' as never);
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.9 : 0.7,
                },
                styles.add,
              ]}
            >
              <AntDesign name="pluscircle" size={45} color="#FEECEB" />
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                router.push('/mypage');
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.9 : 0.7,
                },
              ]}
            >
              <Ionicons name="list-circle" size={55} color="#FEECEB" />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.contents}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 10 }}></View>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                handlePress('chat');
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#d9d9d9' : '#ffffff',
                  padding: pressed ? 5 : 0,
                },
                styles.content,
                { height: buttonHeight },
              ]}
            >
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ padding: 20, justifyContent: 'center', flex: 1 }}>
                  <Text style={{ alignSelf: 'flex-start', fontSize: 20, marginBottom: 5, fontWeight: 600 }}>Chat</Text>
                  <Text style={{ alignSelf: 'flex-start', fontSize: 14 }} numberOfLines={3} ellipsizeMode="tail">
                    You can <Text style={styles.redText}>chat</Text> with a representative who will assist you.
                  </Text>
                </View>
                <CustomImage source={ChatImage} style={{ width: '55%', height: '100%' }} resizeMode="cover" />
              </View>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                handlePress('taxi');
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#d9d9d9' : '#ffffff',
                  padding: pressed ? 5 : 0,
                },
                styles.content,
                { height: buttonHeight },
              ]}
            >
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ padding: 20, justifyContent: 'center', flex: 1 }}>
                  <Text style={{ alignSelf: 'flex-start', fontSize: 20, marginBottom: 5, fontWeight: 600 }}>Taxi</Text>
                  <Text style={{ alignSelf: 'flex-start', fontSize: 14 }} numberOfLines={3} ellipsizeMode="tail">
                    Your contact will handle booking a <Text style={styles.redText}>Kakao Taxi</Text> for you.
                  </Text>
                </View>
                <CustomImage source={TaxiImage} style={{ width: '55%', height: '100%' }} resizeMode="cover" />
              </View>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                handlePress('delivery');
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#d9d9d9' : '#ffffff',
                  padding: pressed ? 5 : 0,
                },
                styles.content,
                { height: buttonHeight },
              ]}
            >
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ padding: 20, justifyContent: 'center', flex: 1 }}>
                  <Text
                    style={{ alignSelf: 'flex-start', fontSize: 18, marginBottom: 5, fontWeight: 600 }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Food Delivery
                  </Text>
                  <Text style={{ alignSelf: 'flex-start', fontSize: 13 }} numberOfLines={3} ellipsizeMode="tail">
                    Get your food delivered through <Text style={styles.redText}>Korean delivery app</Text>!
                  </Text>
                </View>
                <CustomImage source={DeliveryImage} style={{ width: '50%', height: '100%' }} resizeMode="cover" />
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  user: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  paypal: {
    flex: 1,
  },
  top: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FEECEB',
  },
  balance: {
    color: '#FEECEB',
    fontSize: 60,
    fontWeight: '500',
  },
  bottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 14,
    paddingRight: 14,
    marginVertical: 11,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {},
  contents: {
    flex: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#efefef',
    // iOS 전용 그림자 속성
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: -10 }, // 그림자 오프셋
    shadowOpacity: 0.07, // 그림자 불투명도
    shadowRadius: 5, // 그림자 블러 반경
    // Android 전용 그림자 속성
    elevation: 3, // 그림자의 깊이
  },
  content: {
    borderRadius: 20,
    width: '89%',
    justifyContent: 'center',
    marginTop: 10,
    flex: 1,
  },
  redText: {
    color: '#f02f04',
  },
});
