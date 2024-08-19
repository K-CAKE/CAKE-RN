import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function Tutorial() {
  return (
    <LinearGradient colors={['#F02F04', '#F5ECEA']} style={styles.gradientContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Explore Korean delivery apps and shop for food</Text>

        <Card style={styles.card}>
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.fineapp.yogiyo')}>
            <Card.Content style={styles.cardContent}>
              <Image 
                // source={require('CAKE_RN/assets/images/delivery/yogiyo.png')} // 요기요 아이콘
                style={styles.image}
              />
              <Text style={styles.cardText}>Install "Yogiyo" and start shopping</Text>
            </Card.Content>
          </TouchableOpacity>
        </Card>

        <Card style={styles.card}>
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.sampleapp')}>
            <Card.Content style={styles.cardContent}>
              <Image 
                // source={require('CAKE_RN/assets/images/delivery/baemin.png')} // 배민 아이콘
                style={styles.image}
              />
              <Text style={styles.cardText}>Install "Baemin" and start shopping</Text>
            </Card.Content>
          </TouchableOpacity>
        </Card>
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  card: {
    width: '90%',
    backgroundColor: '#FFD4D1',
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 2, // for shadow effect on Android
    shadowColor: '#000', // for shadow effect on iOS
    shadowOffset: { width: 0, height: 2 }, // for shadow effect on iOS
    shadowOpacity: 0.8, // for shadow effect on iOS
    shadowRadius: 2, // for shadow effect on iOS
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});
