import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Address() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleMapPress = () => {
    navigation.navigate('DeliveryMap' as never);  // DeliveryMap으로 네비게이트
  };

  const handleConfirmPress = () => {
    navigation.navigate('Confirm' as never);  // Confirm으로 네비게이트
  };

  return (
    <LinearGradient colors={['#f6f6f6', '#f6f6f6']} style={styles.gradientContainer}>
      <View style={styles.block}>
        <Text style={styles.title}>Regist your Address</Text>

        {/* 주소 검색 텍스트 입력창 */}
        <TextInput
          style={styles.searchBar}
          placeholder="Enter your address"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

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
