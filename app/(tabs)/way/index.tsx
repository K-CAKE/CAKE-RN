import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
// import { NaverMapView } from '@mj-studio/react-native-naver-map';
import FloatingButton from './components/FloatingButton';
import SearchBar from './components/SearchBar';
import RouteList from './components/RouteList';
import RouteDetails from './components/RouteDetails';

export default function Way() {
  const [isSearching, setIsSearching] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);

  const handleSearch = (start: string, end: string) => {
    // 더미 데이터로 경로 목록 생성
    const dummyRoutes = [
      { id: 1, description: 'Route 1: Fastest' },
      { id: 2, description: 'Route 2: Shortest' },
      { id: 3, description: 'Route 3: Scenic' },
    ];
    setRoutes(dummyRoutes);
    setIsSearching(true);
  };

  const handleRouteSelect = (route: any) => {
    setSelectedRoute(route);
  };

  return (
    <View style={styles.container}>
      {!isSearching ? (
        <>
          {/* <NaverMapView
            style={styles.map}
            layerGroups={{
              MOUNTAIN: false,
              CADASTRAL: false,
              BICYCLE: false,
              BUILDING: true,
              TRAFFIC: true,
              TRANSIT: true,
            }}
            initialRegion={{
              latitude: 37.3851,
              longitude: 127.1238,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          /> */}
          <FloatingButton onPress={() => setIsSearching(true)} />
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {!selectedRoute ? (
            <>
              <SearchBar onSearch={handleSearch} />
              {routes.length > 0 && <RouteList routes={routes} onSelectRoute={handleRouteSelect} />}
            </>
          ) : (
            <RouteDetails route={selectedRoute} />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
});
