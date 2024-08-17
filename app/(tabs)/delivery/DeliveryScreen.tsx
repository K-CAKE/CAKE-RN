import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  DeliveryScreen: undefined; // any도 됨
  Orders: undefined;
  DeliveryHistory: undefined;
  Confirm: undefined;
}; // 화면에 대한 매개 변수의 타입을 미리 정의 해줌
// 현재 화면 기준 어떤 화면으로 가는 지 명시 컴파일 하면 없어짐

type DeliveryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function DeliveryScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const navigation = useNavigation<DeliveryScreenNavigationProp>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await processImage(uri);
    }
  };

  const processImage = async (uri: string) => {
    setLoading(true);
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const ocrResult = await sendImageToClovaOCR(base64);
      const extractedText = extractTextFromResponse(ocrResult);
      setOcrText(extractedText);
      const translated = await translateTextWithGPT(extractedText);
      setTranslatedText(translated);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendImageToClovaOCR = async (base64Image: string) => {
    const apiUrl = process.env.EXPO_PUBLIC_NAVER_CLOVA_OCR_API_URL as string;
    const secretKey = process.env.EXPO_PUBLIC_NAVER_CLOVA_OCR_SECRET as string;

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

  const translateTextWithGPT = async (text: string) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Translate the following Korean text to English: ${text}`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_GPT_API_KEY}`,
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error translating text:', error);
      return 'Translation failed';
    }
  };

  return (
    <LinearGradient colors={['#ffafbd', '#ffc3a0']} style={styles.gradientContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Delivery Screen</Text>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <FontAwesome name="camera" size={89} color="#000000" />
            </View>
          )}
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {ocrText && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>OCR Text:</Text>
            <Text>{ocrText}</Text>
          </View>
        )}
        {translatedText && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Translated Text:</Text>
            <Text>{translatedText}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Confirm')

        }>
          <Text style={styles.buttonText}>Confirm the order</Text>
        </TouchableOpacity>
        <View style={{ height: 50 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
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
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  resultContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
