import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PaymentScreen() {
  const { width } = Dimensions.get('window');

  const paymentMethods = [
    { name: '신용·체크카드', image: require('../../../assets/images/pay/card.png') },
    { name: 'N pay', image: require('../../../assets/images/pay/npay.png') },
    { name: 'K pay', image: require('../../../assets/images/pay/kpay.png') },
    { name: 'toss pay', image: require('../../../assets/images/pay/toss.png') },
    { name: 'PAYCO', image: require('../../../assets/images/pay/payco.png') },
    { name: '퀵계좌이체', image: require('../../../assets/images/cake_logo.png') },
    { name: '휴대폰', image: require('../../../assets/images/cake_logo.png') },
  ];

  return (
    <LinearGradient colors={['#F02F04', '#F5ECEA']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>결제 방법</Text>
        <View style={styles.paymentOptionsContainer}>
          {paymentMethods.map((method, index) => (
            <Pressable key={index} style={styles.paymentButton}>
              <Image source={method.image} style={styles.paymentImage} resizeMode="contain" />
              <Text style={styles.paymentText}>{method.name}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>신용카드 무이자 할부 안내</Text>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.agreementContainer}>
            <Text style={styles.agreementText}>[필수] 결제 서비스 이용 약관, 개인정보 처리 동의</Text>
          </View>
          <Pressable style={styles.payButton}>
            <Text style={styles.payButtonText}>결제하기</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentButton: {
    width: '30%',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  paymentImage: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 5,
  },
  paymentText: {
    fontSize: 10,
    textAlign: 'center',
  },
  noticeContainer: {
    marginBottom: 20,
  },
  noticeText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
    alignItems: 'center',
  },
  agreementContainer: {
    marginBottom: 20,
  },
  agreementText: {
    fontSize: 12,
    textAlign: 'center',
  },
  payButton: {
    backgroundColor: '#F02F04',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 13,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // 그림자 추가
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
 
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
