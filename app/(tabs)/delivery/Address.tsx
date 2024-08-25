import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || ''; // as string 붙여도됨
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);
// Supabase 클라이언트 초기화

export default function Address() {

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [foodName, setFoodName] = useState('');
  const [deliveryDestination, setDeliveryDestination] = useState('');
  const [foodPrice, setFoodPrice] = useState('');

  const handleMapPress = () => {
    navigation.navigate('DeliveryMap' as never);  // DeliveryMap으로 네비게이트
  };

  const handleConfirmPress = async () => {
    try {
      const { data, error } = await supabase
        .from('food_request_history')
        .insert([
          {
            request_state: '0',
            request_price: parseInt(foodPrice, 10),
            food_payment: parseInt(foodPrice, 10),
            processing_date: new Date().toISOString().split('T')[0], // 현재 일자
            serial_number: '12345678987699',
            korean_fee: parseInt(foodPrice, 10),
            food_name: foodName,
            foreigner_id: 2,
            korean_id: 1,
            request_position : deliveryDestination,
          },
        ]);

      if (error) {
        throw error;
      }

      Alert.alert('성공', '데이터가 성공적으로 삽입되었습니다.');
      navigation.navigate('Confirm' as never);  // Confirm으로 네비게이트
    } catch (error) {
      console.error('데이터 삽입 오류:', (error as Error).message);
      Alert.alert('오류', '데이터 삽입에 실패했습니다.');
    }
  };

  return (
    <LinearGradient colors={['#f6f6f6', '#f6f6f6']} style={styles.gradientContainer}>
      <View style={styles.block}>
        <Text style={styles.title}>Regist your Address</Text>

        {/* 텍스트 입력 필드들 */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Food Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter food name"
            value={foodName}
            onChangeText={setFoodName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Delivery Destination</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter delivery destination"
            value={deliveryDestination}
            onChangeText={setDeliveryDestination}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Food Price</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter food price"
            value={foodPrice}
            onChangeText={setFoodPrice}
            keyboardType="numeric"
          />
        </View>

   

        {/* 현재 위치로 주소 찾기 버튼 */}
        <TouchableOpacity style={styles.button} onPress={handleMapPress}>
          <FontAwesome name="search" size={20} color="#FFF" />
          <Text style={styles.buttonText}>현재 위치로 주소 찾기</Text>
        </TouchableOpacity>

        {/* 주문 완료하기 버튼 */}
        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirmPress}>
          <Text style={styles.buttonText}>주문 완료하기</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  textInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  searchBar: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#F02F04',
    padding: 10,
    borderRadius: 13,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#F02F04',
    padding: 10,
    borderRadius: 13,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
