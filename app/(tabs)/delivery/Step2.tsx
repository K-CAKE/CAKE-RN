// 메뉴 텍스트 변환
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Step2 = () => {
  const [region, setRegion] = useState<string | null>(null);
  const [translations, setTranslations] = useState<string[] | null>(null);

  const fetchRegion = async () => {
    const { data, error } = await supabase
      .from('foreigner')
      .select('region')
      .eq('foreigner_id', 2)
      .single();

    if (error) {
      console.error('Error fetching region:', error);
    } else if (data) {
      setRegion(data.region);
      fetchTranslations(data.region); // Fetch translations based on region
    }
  };

  const fetchTranslations = async (region: string) => {
    const foods = ["피자", "돈까스", "커피", "빙수", "자장면", "보쌈", "냉면", "치킨", "햄버거","닭갈비"]; // 음식 메뉴
    const language = getLanguageFromRegion(region);
    const translations = await translateFoodItems(foods, language);
    setTranslations(translations);
  };

  const getLanguageFromRegion = (region: string): string => {
    const regionLanguageMap: { [key: string]: string } = {
      "1": "English",   // 미국
      "82": "Korean",   // 대한민국
      // 필요한 경우 여기에 추가
    };
    return regionLanguageMap[region] || "English";
  };

  const translateFoodItems = async (foods: string[], language: string): Promise<string[]> => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `Translate the following words into ${language}: ${foods.join(", ")}`,
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

      const translatedText = response.data.choices[0].message.content;
      return translatedText.split(", ");
    } catch (error) {
      console.error('Error translating text:', error);
      return foods; // 번역 실패 시 원본 단어 반환
    }
  };

  useEffect(() => {
    fetchRegion();
  }, []);

  return (
    <LinearGradient colors={['#F02F04', '#F5ECEA']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Member Region Information</Text>
        {region ? (
          <Text style={styles.regionText}>Region: {region}</Text>
        ) : (
          <Text style={styles.loadingText}>Loading region...</Text>
        )}
        {translations ? (
          translations.map((translation, index) => (
            <Text key={index} style={styles.translationText}>{translation}</Text>
          ))
        ) : (
          <Text style={styles.loadingText}>Loading translations...</Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  regionText: {
    fontSize: 18,
    color: '#FFF',
  },
  translationText: {
    fontSize: 16,
    color: '#FFF',
  },
  loadingText: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default Step2;
