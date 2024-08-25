import React from 'react';
import { Image, StyleSheet, ImageStyle, ViewStyle } from 'react-native';

// CustomImage 컴포넌트의 props 타입 정의
interface CustomImageProps {
  source: any; // 이미지 소스 타입. (예: require('./path/to/image.png'))
  width?: number;
  height?: number;
  style?: ImageStyle | ViewStyle; // 추가적인 스타일
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'; // resizeMode 옵션
}

// CustomImage 컴포넌트 정의
const CustomImage: React.FC<CustomImageProps> = ({
  source,
  width = 100,
  height = 100,
  style,
  resizeMode = 'contain',
}) => {
  return (
    <Image
      source={source}
      style={[styles.image, { width, height }, style]} // 기본 스타일과 사용자 스타일 병합
      resizeMode={resizeMode} // 이미지의 크기 조정 방법
    />
  );
};

// 기본 스타일
const styles = StyleSheet.create({
  image: {
    // 기본 스타일을 여기에 추가할 수 있습니다.
  },
});

export default CustomImage;
