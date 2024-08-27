import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, Animated } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Step1: undefined; // Step1으로 이동하기 위한 타입 추가
  Tutorial: undefined;
};

type TutorialScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tutorial'>;

export default function Tutorial() {
  const navigation = useNavigation<TutorialScreenNavigationProp>();
  const wobbleAnim = useRef(new Animated.Value(0)).current; // 애니메이션 값

  useEffect(() => {
    // "흔들림(wobble)" 애니메이션을 설정
    Animated.loop(
      Animated.sequence([
        Animated.timing(wobbleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnim, {
          toValue: -1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [wobbleAnim]);

  const wobbleInterpolate = wobbleAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: wobbleInterpolate }],
  };

  return (
    <LinearGradient colors={['#F02F04', '#F5ECEA']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Explore Korean delivery apps and shop for food</Text>

        <Card style={styles.card}>
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.fineapp.yogiyo')}>
            <Card.Content style={styles.cardContent}>
              <Image 
                source={require('../../../assets/images/delivery/yogiyo.png')} // 요기요 아이콘
                style={styles.image}
              />
              <Text style={styles.cardText}>Install "Yogiyo" and start shopping</Text>
            </Card.Content>
          </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.sampleapp')}>
            <Card.Content style={styles.cardContent}>
              <Image 
                source={require('../../../assets/images/delivery/baemin.png')} // 배민 아이콘
                style={styles.image}
              />
              <Text style={styles.cardText}>Install "Baemin" and start shopping</Text>
            </Card.Content>
          </TouchableOpacity>
        </Card>

        {/* 아래 애니메이션이 적용된 텍스트 버튼 추가 */}
        <TouchableOpacity onPress={() => navigation.navigate('Step1')}>
          <Animated.Text style={[styles.footerText, animatedStyle]}>
            Complete the delivery by viewing the tutorial for Korean delivery apps
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  card: {
    width: '90%',
    backgroundColor: '#FFD4D1',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 2, // for shadow effect on Android
    shadowColor: '#000', // for shadow effect on iOS
    shadowOffset: { width: 0, height: 2 }, // for shadow effect on iOS
    shadowOpacity: 0.8, // for shadow effect on iOS
    shadowRadius: 2, // for shadow effect on iOS
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
  footerText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 30,
    textAlign: 'center',
  },
});
