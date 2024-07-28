import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useNavigation } from "expo-router";
import { Dimensions, Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useState } from 'react';
import * as Progress from 'react-native-progress';

//Icon
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput } from 'react-native-gesture-handler';

export default function Page() {
  //progress bar 관련
  const screenWidth = Dimensions.get('window').width;
  const barWidth = 0.9 * screenWidth;
  //navigation
  const navigation = useNavigation();
  //input
  const [Dep, setDep] = useState("");
  const [Arrival, setArrival] = useState("");
  const [HC, setHC] = useState(0);
  const [baggage, setBaggage] = useState(0);
  const [size, setSize] = useState('normal');
  const [quickBooking, setQuick] = useState(false);

  return (
      <View style={{ flex:1 }}>
        <Stack.Screen 
          options={{
            headerTitle: 'Call taxi',
            headerBackVisible: false,
            headerRight: () => (
              <Pressable
              onPress={() => {
                console.log('question button');
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7: 1
                },
              ]}
            >
              <FontAwesome name="question-circle-o" size={24} color="black" />
            </Pressable>
            ),
            headerLeft: () => (
              <Pressable
              onPress={() => {
                navigation.navigate('home');
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7: 1
                },
              ]}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>
            ),
          }}
          />
        <ScrollView style={styles.block}>
          <View style={{ alignSelf: 'center', marginBottom: 20, }}> 
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <MaterialCommunityIcons name="numeric-1-circle-outline" size={24} color="#FFD4D1" />
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <MaterialCommunityIcons name="numeric-2-circle-outline" size={24} color="#FFD4D1" />
              </View>
            </View>
            <Progress.Bar 
              progress={0} 
              width={barWidth}
              height={13}
              color="#F02F04"
              borderColor='white'
              unfilledColor="#FFD4D1"
              borderRadius={50}
            />
          </View>
          <View>
            <View>
              <Text>Departure</Text>
                <TextInput
                  onChangeText={ (val) => setDep(val)}
                  style={styles.input}
                />
            </View>  
            <View>
              <Text>Arrival</Text>
            </View> 
            <View>
              <Text>Headcount</Text>
            </View> 
            <View>
              <Text>Baggage</Text>
            </View> 
            <View>
              <Text>Size</Text>
            </View> 
          </View>
        </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {

  },
  input: {
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },
});