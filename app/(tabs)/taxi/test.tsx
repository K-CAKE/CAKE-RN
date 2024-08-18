import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchDrivingRoute } from './fetchDrivingRoute';

// 경로의 각 지점을 나타내는 타입 정의
interface PathPoint {
  lng: number; // 경도
  lat: number; // 위도
}

// RouteItem에서 path만 사용하는 타입 정의
interface RouteItem {
  path: PathPoint[]; // 경로를 구성하는 좌표열
}

// API 응답 데이터 타입 정의
interface RouteData {
  route: RouteItem[];
}

// 에러 타입 정의
interface Error {
  message: string;
}

const Test: React.FC = () => {
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDrivingRoute(
          '37.5501,127.0670', // 출발지: 중앙대학교 서울캠퍼스 후문
          '37.3933,127.1380', // 목적지: 서현역
          '', // 경유지 (선택사항)
          'traoptimal', // 탐색 옵션 (선택사항)
          '1', // 톨게이트 요금 계산용 차종 정보 (선택사항)
          'gasoline', // 유류비 계산용 유종 (선택사항)
          14, // 차량 연비 (선택사항)
          'ko', // 언어 종류 (선택사항)
        );
        setRouteData(data);
      } catch (err) {
        setError({ message: err instanceof Error ? err.message : 'Unknown error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driving Route Points:</Text>
      {routeData?.route.map((item, index) => (
        <View key={index} style={styles.routeItem}>
          <Text>Path:</Text>
          {item.path.length === 0 ? (
            <Text>No path data available.</Text>
          ) : (
            item.path.map((point, idx) => (
              <Text key={idx}>
                Point {idx}: Longitude: {point.lng}, Latitude: {point.lat}
              </Text>
            ))
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  routeItem: {
    marginBottom: 8,
  },
});

export default Test;
