import { Stack, useNavigation } from 'expo-router';
import { View, Text, StyleSheet, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // 올바른 import 경로

export default function MyPage() {
  const navigation = useNavigation();

  // Example data for history and points
  const taxiHistory = [
    {
      id: '1',
      date: '2024-08-18',
      price: '15,000₩',
      serialNumber: 'SN123456',
      agentId: 'donghee',
      requestState: 'Completed',
    },
    {
      id: '2',
      date: '2024-08-17',
      price: '18,000₩',
      serialNumber: 'SN654321',
      agentId: 'minji',
      requestState: 'In Progress',
    },
  ];

  const deliveryHistory = [
    {
      id: '1',
      date: '2024-08-18',
      items: 'Groceries',
      price: '5,000₩',
      serialNumber: 'SN987654',
      agentId: 'hyunwoo',
      requestState: 'Completed',
    },
    {
      id: '2',
      date: '2024-08-17',
      items: 'Dinner',
      price: '12,000₩',
      serialNumber: 'SN456789',
      agentId: 'eunji',
      requestState: 'Pending',
    },
  ];

  const points = {
    current: '20,000₩',
    used: '5,000₩',
  };

  const getStatusButtonGradient = (status: string) => {
    switch (status) {
      case 'Completed':
        return ['#4CAF50', '#81C784']; // Green gradient
      case 'Pending':
        return ['#FFC107', '#FFD54F']; // Yellow gradient
      case 'In Progress':
        return ['#2196F3', '#64B5F6']; // Blue gradient
      default:
        return ['#9E9E9E', '#BDBDBD']; // Grey gradient
    }
  };

  const renderHistoryItem = ({ item }: { item: any }) => (
    <LinearGradient
      colors={['#FEECEB', '#FFC1C1']} // Light red to pink gradient for history items
      style={styles.historyItem}
    >
      <Text style={styles.historyText}>Processing Date: {item.date}</Text>
      <Text style={styles.historyText}>Price: {item.price}</Text>
      <Text style={styles.historyText}>Serial Number: {item.serialNumber}</Text>
      <Text style={styles.historyText}>Agent ID: {item.agentId}</Text>
      <TouchableOpacity style={styles.statusButtonWrapper}>
        <LinearGradient colors={getStatusButtonGradient(item.requestState)} style={styles.statusButton}>
          <Text style={styles.statusText}>{item.requestState}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );

  const renderDeliveryItem = ({ item }: { item: any }) => (
    <LinearGradient
      colors={['#FEECEB', '#FFC1C1']} // Light red to pink gradient for history items
      style={styles.historyItem}
    >
      <Text style={styles.historyText}>Processing Date: {item.date}</Text>
      <Text style={styles.historyText}>Items: {item.items}</Text>
      <Text style={styles.historyText}>Price: {item.price}</Text>
      <Text style={styles.historyText}>Serial Number: {item.serialNumber}</Text>
      <Text style={styles.historyText}>Agent ID: {item.agentId}</Text>
      <TouchableOpacity style={styles.statusButtonWrapper}>
        <LinearGradient colors={getStatusButtonGradient(item.requestState)} style={styles.statusButton}>
          <Text style={styles.statusText}>{item.requestState}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: 'My Page',
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('home' as never)}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <View style={styles.block}>
        <FlatList
          data={['']}
          renderItem={() => null}
          ListHeaderComponent={
            <>
              <Text style={styles.title}>Point History</Text>
              <LinearGradient
                colors={['#FFF', '#F56A6A']} // Light red to white gradient
                style={styles.pointsBackground}
              >
                <Text style={styles.pointsText}>Current Points: {points.current}</Text>
                <Text style={styles.pointsText}>Used Points: {points.used}</Text>
              </LinearGradient>

              <Text style={styles.title}>Taxi Service History</Text>
              <View style={styles.section}>
                <FlatList data={taxiHistory} renderItem={renderHistoryItem} keyExtractor={(item) => item.id} />
              </View>

              <Text style={styles.title}>Delivery Service History</Text>
              <View style={styles.section}>
                <FlatList data={deliveryHistory} renderItem={renderDeliveryItem} keyExtractor={(item) => item.id} />
              </View>
            </>
          }
          ListFooterComponent={<View style={{ height: 150 }} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#F56A6A',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: 'white', // Background for sections
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  pointsBackground: {
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 20,
  },
  pointsText: {
    fontSize: 14,
    color: '#000', // Black text for contrast
    marginBottom: 5,
  },
  historyItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  historyText: {
    fontSize: 14,
    color: 'black',
  },
  statusButtonWrapper: {
    width: '100%', // Full width of the parent container
    alignItems: 'center',
  },
  statusButton: {
    width: 110, // Fixed width for the button
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedButton: {
    backgroundColor: '#4CAF50', // Green for Completed
  },
  pendingButton: {
    backgroundColor: '#FFC107', // Yellow for Pending
  },
  inProgressButton: {
    backgroundColor: '#2196F3', // Blue for In Progress
  },
  defaultButton: {
    backgroundColor: '#9E9E9E', // Grey for Default
  },
  statusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14, // Adjust font size as needed
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
