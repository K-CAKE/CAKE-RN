import { Stack } from "expo-router";
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Page() {
  const [selectedFilter, setSelectedFilter] = useState('restaurants');
  // 임시 데이터
  const locations = [
    {
      type: 'restaurants',
      name: 'restaurant 1',
      address: '123 Main St',
      openingHours: '9:00 AM - 9:00 PM',
    },
    {
      type: 'restaurants',
      name: 'restaurant 2',
      address: '456 Main St',
      openingHours: '10:00 AM - 10:00 PM',
    },
    {
      type: 'restaurants',
      name: 'restaurant 3',
      address: '789 Main St',
      openingHours: '8:00 AM - 8:00 PM',
    },
    {
      type: 'restaurants',
      name: 'restaurant 4',
      address: '101 Main St',
      openingHours: '7:00 AM - 7:00 PM',
    },
    {
      type: 'cafe',
      name: 'cafe 1',
      address: '202 Main St',
      openingHours: '6:00 AM - 6:00 PM',
    },
    {
      type: 'cafe',
      name: 'cafe 2',
      address: '303 Main St',
      openingHours: '9:00 AM - 9:00 PM',
    },
    {
      type: 'cafe',
      name: 'cafe 3',
      address: '404 Main St',
      openingHours: '8:00 AM - 8:00 PM',
    },
    {
      type: 'cafe',
      name: 'cafe 4',
      address: '505 Main St',
      openingHours: '7:00 AM - 7:00 PM',
    },
    {
      type: 'CVS',
      name: 'CVS 1',
      address: '606 Main St',
      openingHours: '24 Hours',
    },
    {
      type: 'CVS',
      name: 'CVS 2',
      address: '707 Main St',
      openingHours: '24 Hours',
    },
    {
      type: 'CVS',
      name: 'CVS 3',
      address: '808 Main St',
      openingHours: '24 Hours',
    },
    {
      type: 'CVS',
      name: 'CVS 4',
      address: '909 Main St',
      openingHours: '24 Hours',
    },
  ];

  const filteredLocations = locations.filter((location) => location.type === selectedFilter);

  return (
    <>
    <View>
      <Stack.Screen options={{ headerShown: false }} />
    </View>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="road" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <Text style={styles.mapText}>Map Area</Text>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'restaurants' && styles.selectedFilterButton]}
          onPress={() => setSelectedFilter('restaurants')}
        >
          <Text style={styles.filterText}>restaurants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'cafe' && styles.selectedFilterButton]}
          onPress={() => setSelectedFilter('cafe')}
        >
          <Text style={styles.filterText}>cafe</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedFilter === 'CVS' && styles.selectedFilterButton]}
          onPress={() => setSelectedFilter('CVS')}
        >
          <Text style={styles.filterText}>CVS</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {filteredLocations.map((location, index) => (
          <TouchableOpacity key={index} style={styles.locationCard}>
            <View style={styles.locationImage}></View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>{location.name}</Text>
              <Text style={styles.metadataText}>Address: {location.address}</Text>
              <Text style={styles.metadataText}>Hours: {location.openingHours}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    </>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  button: {
    padding: 10,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 18,
    color: 'gray',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#e0e0e0',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    backgroundColor: '#c0c0c0',
  },
  selectedFilterButton: {
    backgroundColor: '#fbcfdd',
  },
  filterText: {
    color: 'black',
  },
  scrollViewContent: {
    paddingBottom: 80,
    alignItems: 'center',
  },
  locationCard: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    width: width * 0.9,
  },
  locationImage: {
    width: '30%',
    backgroundColor: '#FEECEB',
    margin: 10,
    padding: 20,
  },
  locationInfo: {
    width: '70%',
    padding: 10,
  },
  locationText: {
    fontSize: 18,
    color: 'black',
  },
  metadataText: {
    fontSize: 14,
    color: 'gray',
  },
});