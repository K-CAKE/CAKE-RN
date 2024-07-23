import { Stack } from "expo-router";
import { StyleSheet, Text, Pressable, View, Dimensions, LayoutChangeEvent } from "react-native";

import { useHeaderHeight } from '@react-navigation/elements';
import Svg, { Path } from "react-native-svg"
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { useNavigation } from "expo-router";

export default function Page() {
  const headerHeight = useHeaderHeight();
  const [paddingTop, setPaddingTop] = useState(0);
  const { height } = Dimensions.get('window');
  const buttonHeight = (3 / 5) * height / 4.5;

  const navigation = useNavigation();

  const handlePress = (screen: string) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    setPaddingTop(headerHeight);
  }, [headerHeight]);

  return (
      <LinearGradient 
        colors={["#F02F04", "#F5ECEA"]}
        style={[styles.block, { paddingTop }]}
      >
        <Stack.Screen 
          options={{
            headerTransparent: true,
            headerLeft: () => (
              <Svg
                width={23}
                height={23}
                viewBox="0 0 23 23"
              >
                <Path d="M6.10892 4.03538C8.30163 -0.453042 14.6984 -0.453054 16.8911 4.03536L21.5716 13.6163C23.5189 17.6022 20.6167 22.25 16.1806 22.25H6.81944C2.38329 22.25 -0.518867 17.6023 1.42837 13.6163L6.10892 4.03538Z" fill="#FEECEB" />
              </Svg>
            ),
            headerRight: () => (
              <Pressable
              onPress={() => {
                console.log('user button');
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7: 1
                },
                styles.paypal_button
              ]}
            >
              <FontAwesome name="user-circle" size={35} color='#FEECEB' />
            </Pressable>
            ),
            headerTitle: ''
          }}
        />
        <View style={styles.paypal}>
          <View style={styles.top}>
            <Text style={[styles.text, { fontSize: 15 }]}>PayPal balance</Text>
            <View style={{ flexDirection: 'row',alignItems: 'center' }}>
              <Text style={styles.balance}>$ 0.00</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <View style={styles.button}>
              <Pressable
                onPress={() => {
                  console.log('Add button');
                }}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.9: 0.7
                  },
                  styles.add
                ]} 
              >
                <AntDesign name="pluscircle" size={45} color='#FEECEB'/>
              </Pressable>
            </View>
            <View style={styles.button}>
              <Pressable
                onPress={() => {
                  console.log('PayPal button');
                }}
                style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.9: 0.7
                  },
                  styles.paypal_button
                ]}
              >
                <FontAwesome name="cc-paypal" size={39} color="#FEECEB" />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.contents}>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                handlePress('way');
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#d9d9d9': '#ffffff',
                  padding: pressed ? 25: 20
                },
                styles.content,
                { height: buttonHeight }
              ]}
            >
              <View style={{ flexDirection: 'row'}}>
                <Text> 아이콘 자리 </Text>
                <Text> Map 서비스 설명 자리 </Text>
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
                  backgroundColor: pressed ? '#d9d9d9': '#ffffff',
                  padding: pressed ? 25: 20
                },
                styles.content,
                { height: buttonHeight }
              ]}
            >
              <Text>Taxi</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                handlePress('delivery');
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#cdcdcd': '#ffffff',
                  padding: pressed ? 25: 20
                },
                styles.content,
                { height: buttonHeight }
              ]}
            >
              <Text>Food delivery</Text>
            </Pressable>
          </View>
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
    flex: 2,
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
    paddingRight: 19,
    marginVertical: 11,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  paypal_button: {},
  add: {},
  contents: {
    flex: 3,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#efefef',
    paddingTop: 30,
    // iOS 전용 그림자 속성
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 10 }, // 그림자 오프셋
    shadowOpacity: 0.5, // 그림자 불투명도
    shadowRadius: 10, // 그림자 블러 반경
    // Android 전용 그림자 속성
    elevation: 5, // 그림자의 깊이
    justifyContent: 'space-around',
    paddingBottom: 100,
  },
  content: {
    borderRadius: 20,
    width: '89%',
    justifyContent: 'center',
  }
});

