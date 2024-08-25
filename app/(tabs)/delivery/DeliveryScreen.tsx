import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Stack, useRouter } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';

type RootStackParamList = {
  DeliveryScreen: undefined;
  Orders: undefined;
  DeliveryHistory: undefined;
  Confirm: undefined;
  DeliveryStatus: undefined;
  tutorial: undefined;
  Address: undefined;
};

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
          format: 'jpg',
          name: 'demo',
          data: base64Image,
        },
      ],
      requestId: 'demo-request',
      version: 'V2',
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
        },
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error translating text:', error);
      return 'Translation failed';
    }
  };

  const router = useRouter();

  return (
    <LinearGradient colors={['#f6f6f6', '#f6f6f6']} style={styles.gradientContainer}>
      <Stack.Screen
        options={{
          headerTitle: 'Food Delivery',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // 배경색을 흰색 50% 투명도로 설정
          },
          headerRight: () => (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('tutorial')}>
                <FontAwesome name="question-circle-o" size={26} color="#f02f04" />
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 4, marginBottom: 40 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Your order</Text>
          </View>
          <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <MaterialCommunityIcons name="file-image-plus" size={80} color="gray" />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {image ? (
            <>
              {loading && <ActivityIndicator size="large" color="#FFD4D1" />}
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
            </>
          ) : (
            <>
              <Text style={{ fontSize: 17, fontWeight: '300', marginBottom: 3 }}>Please upload a screenshot</Text>
              <Text style={{ fontSize: 17, fontWeight: '300', marginBottom: 3 }}>showing the selected dishes and</Text>
              <Text style={{ fontSize: 17, fontWeight: '300', marginBottom: 3 }}>
                customization options from the delivery app.
              </Text>
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Address')}>
            <Text style={styles.buttonText}> Register your address.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  questionIcon: {
    paddingBottom: 5,
    paddingTop: 5,
    marginRight: 20,
  },
  container: {
    marginBottom: 100,
    paddingTop: 120,
    flexGrow: 1,
    padding: 20,
  },
  imageContainer: {
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    // iOS 전용 그림자 속성
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 10 }, // 그림자 오프셋
    shadowOpacity: 0.1, // 그림자 불투명도
    shadowRadius: 5, // 그림자 블러 반경
    // Android 전용 그림자 속성
    elevation: 5, // 그림자의 깊이
  },
  image: {
    borderRadius: 13,
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#ffffff',
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
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 10,
  },
});
