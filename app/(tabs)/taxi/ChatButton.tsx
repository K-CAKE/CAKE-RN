import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

//Icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

function ChatButton() {
  return (
    <View style={styles.wrapper}>
      <Pressable style={(pressed) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}>
        <MaterialIcons name="chat" size={27} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 86,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    // iOS 전용 그림자 속성
    shadowColor: '#4d4d4d', // 그림자 색상
    shadowOffset: { width: 0, height: 4 }, // 그림자 오프셋
    shadowOpacity: 0.3, // 그림자 불투명도
    shadowRadius: 4, // 그림자 블러 반경
    // Android 전용 그림자 속성
    elevation: 5, // 그림자의 깊이
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F02F04',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatButton;
