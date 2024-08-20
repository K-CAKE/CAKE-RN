// 메뉴 텍스트 변환
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Step2() {
  const [region, setRegion] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegion = async () => {
      const { data, error } = await supabase
        .from('foreigner')
        .select('region')
        .eq('foreigner_id', 2)
        .single(); // 단일 레코드만 가져오기

      if (error) {
        console.error('Error fetching region:', error);
      } else if (data) {
        setRegion(data.region);
      }
    };

    fetchRegion();
  }, []);

  return (
    <LinearGradient colors={['#F02F04', '#F5ECEA']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Member Region Information</Text>
        {region ? (
          <Text style={styles.regionText}>Region: {region}</Text>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>
    </LinearGradient>
  );
}

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
  loadingText: {
    fontSize: 18,
    color: '#FFF',
  },
});
