import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeliveryScreen from '../(tabs)/delivery';

const Stack = createNativeStackNavigator();

function OrdersScreen() {
  return (
    <View>
      <Text>OrdersScreen</Text>
    </View>
  );
}

function OrderDeliveryScreen() {
  return (
    <View>
      <Text>OrderDeliveryScreen</Text>
    </View>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Delivery">
        <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="OrderDelivery" component={OrderDeliveryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
