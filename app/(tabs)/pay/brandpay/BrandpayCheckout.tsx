import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { BrandpaySuccess } from  '../brandpay/BrandpaySuccess'
const BrandpayCheckout: React.FC = () => {
  const navigation = useNavigation();

  const handleBrandpay = () => {
    // TODO: 토스 Brandpay API 호출 - 테스트 키 삽입 
    navigation.navigate('BrandpaySuccess' as never); // as never 붙여서 넘어가게 해놨음
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brandpay Checkout</Text>
      <Button title="Pay with Brandpay" onPress={handleBrandpay} />
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

export default BrandpayCheckout;
