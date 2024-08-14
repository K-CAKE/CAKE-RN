import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

export default function OcrScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await processImage(uri);
    }
  };

  const processImage = async (uri: string) => {
    setLoading(true);
    try {
      // 이미지를 Base64로 인코딩
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const response = await sendImageToClovaOCR(base64);
      // 응답에서 텍스트만 추출
      const extractedText = extractTextFromResponse(response);
      setOcrResult(extractedText);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendImageToClovaOCR = async (base64Image: string) => {
    const apiUrl = process.env.EXPO_PUBLIC_NAVER_CLOVA_OCR_API_URL as string; // 환경 변수에서 API URL 가져오기
    const secretKey = process.env.EXPO_PUBLIC_NAVER_CLOVA_OCR_SECRET as string; // 환경 변수에서 시크릿 키 가져오기

    const requestBody = {
      images: [
        {
          format: "jpg",
          name: "demo",
          data: base64Image,
        },
      ],
      requestId: "demo-request",
      version: "V2",
      timestamp: Date.now(),
    };

    try {
      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'X-OCR-SECRET': secretKey,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error sending image to Clova OCR:', error);
      throw error;
    }
  };

  // OCR 응답에서 텍스트만 추출하는 함수
  const extractTextFromResponse = (response: any): string => {
    try {
      const { images } = response;
      const lines = images[0].fields.map((field: any) => field.inferText);
      return lines.join(' ');
    } catch (error) {
      console.error('Error extracting text from OCR response:', error);
      return 'Text extraction failed';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Delivery Screen</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        <Text>Tap to select an image</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {ocrResult && (
        <View style={styles.ocrResultContainer}>
          <Text style={styles.ocrResultTitle}>OCR Result:</Text>
          <Text>{ocrResult}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  ocrResultContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  ocrResultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
