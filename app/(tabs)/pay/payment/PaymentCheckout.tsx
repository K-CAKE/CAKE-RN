import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createPaymentIntent } from '@/services/paymentService'; // 토스 결제 모듈 추가 설치 필요
// import { PaymentSuccess } from  '../payment/PaymentSuccess';
const PaymentCheckout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const paymentIntent = await createPaymentIntent();
      Alert.alert("Payment Intent Created", `Intent: ${paymentIntent.id}`);
      navigation.navigate('PaymentSuccess' as never);
    } catch (error) {
      Alert.alert("Payment Error", (error as any).message); // any 타입으로 캐스팅해서 사용 -> 리팩토림 필요
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Button 
        title={loading ? "Processing..." : "Pay with Toss"} 
        onPress={handlePayment} 
        disabled={loading} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default PaymentCheckout;
