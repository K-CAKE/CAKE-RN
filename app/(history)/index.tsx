import { router, Stack } from 'expo-router';
import { View, Text, StyleSheet, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // 올바른 import 경로
import { useTheme } from 'react-native-paper';

export default function MyPage() {
  const {
    colors: { primary, secondary },
  } = useTheme();
  // Example data for history and points
  const History = [
    {
      date: '2024-08-18',
      type: 'Delivery',
      price: '15,000₩',
      agentId: 'donghee',
      requestState: 'Completed',
    },
    {
      date: '2024-08-17',
      price: '18,000₩',
      type: 'Taxi',
      agentId: 'minji',
      requestState: 'Pending',
    },
    {
      date: '2024-08-18',
      price: '15,000₩',
      type: 'Delivery',
      agentId: 'donghee',
      requestState: 'Completed',
    },
    {
      date: '2024-08-17',
      price: '18,000₩',
      type: 'Delivery',
      agentId: 'minji',
      requestState: 'In Progress',
    },
    {
      date: '2024-08-18',
      price: '15,000₩',
      agentId: 'donghee',
      type: 'Taxi',
      requestState: 'Pending',
    },
    {
      date: '2024-08-17',
      price: '18,000₩',
      type: 'Delivery',
      agentId: 'minji',
      requestState: 'In Progress',
    },
    {
      date: '2024-08-18',
      price: '15,000₩',
      type: 'Taxi',
      agentId: 'donghee',
      requestState: 'Completed',
    },
    {
      date: '2024-08-17',
      price: '18,000₩',
      type: 'Delivery',
      agentId: 'minji',
      requestState: 'In Progress',
    },
    {
      date: '2024-08-18',
      price: '15,000₩',
      type: 'Taxi',
      agentId: 'donghee',
      requestState: 'Completed',
    },
    {
      date: '2024-08-17',
      price: '18,000₩',
      type: 'Taxi',
      agentId: 'minji',
      requestState: 'In Progress',
    },
  ];
  const getStatusButtonGradient = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'black'; // Green gradient
      case 'Pending':
        return primary; // Yellow gradient
      case 'In Progress':
        return '#ff5252'; // Blue gradient
      default:
        return primary; // Grey gradient
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Taxi':
        return 'car-outline';
      case 'Delivery':
        return 'fast-food';
      default:
        return 'home';
    }
  };
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.historyItem}>
      <TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View>
            <Text style={styles.historyText}>{item.date}</Text>
            <Text style={styles.historyText}>{item.price}</Text>
            <Text style={styles.historyText}>Agent ID: {item.agentId}</Text>
          </View>
          <Ionicons name={getStatusIcon(item.type)} size={50} color={'gray'} />
        </View>
        <Text style={[styles.statusText, { color: getStatusButtonGradient(item.requestState) }]}>
          {item.requestState}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={['#ffd4d1', '#efefef']} locations={[0.0, 0.5]} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: 'History',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerTransparent: true,
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // 배경색을 흰색 50% 투명도로 설정
          },
          headerLeft: () => (
            <Pressable onPress={() => router.push('/(tabs)/home')}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.block}>
        <FlatList
          style={{ paddingTop: 85 }}
          data={History}
          renderItem={renderItem}
          ListFooterComponent={<View style={{ height: 300 }} />}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    padding: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
  },
  historyItem: {
    padding: 10,
    marginHorizontal: 10,
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
  },
  historyText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14, // Adjust font size as needed
    textAlign: 'center',
  },
});
