import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { WidgetSuccess } from  '../widget/WidgetSuccess';
const WidgetCheckout: React.FC = () => {
  const navigation = useNavigation();

  const handleWidgetPayment = () => {
    // TODO: 위젯 결제 API 호출
    navigation.navigate('WidgetSuccess' as never); // ? 이거 왜 에러 뜸? 일단 as never 붙여서 넘어가게 해놨음
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Widget Checkout</Text>
      <Button title="Pay with Widget" onPress={handleWidgetPayment} />
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

export default WidgetCheckout;
