import { NCLOUD_MAPS_ANDROID_CLIENT_ID, NCLOUD_MAPS_ANDROID_CLIENT_SECRET } from 'react-native-dotenv';

import axios from 'axios';

// 기본 요청 URL
const BASE_URL = 'https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving';

/**
 * Naver Driving API를 호출하여 경로를 검색합니다.
 * @param {string} start 출발지 (좌표)
 * @param {string} goal 목적지 (좌표들)
 * @param {string} [waypoints] 경유지 (선택사항)
 * @param {string} [option] 탐색 옵션 (선택사항)
 * @param {string} [cartype] 톨게이트 요금 계산용 차종 정보 (선택사항)
 * @param {string} [fueltype] 유류비 계산용 유종 (선택사항)
 * @param {number} [mileage] 차량 연비 (선택사항)
 * @param {string} [lang] 언어 종류 (선택사항)
 * @returns {Promise} API 응답
 */
export const fetchDrivingRoute = async (
  start,
  goal,
  waypoints = '',
  option = 'traoptimal',
  cartype = '1',
  fueltype = 'gasoline',
  mileage = 14,
  lang = 'ko',
) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        start,
        goal,
        waypoints,
        option,
        cartype,
        fueltype,
        mileage,
        lang,
      },
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': NAVER_CLIENT_SECRET,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching driving route:', error);
    throw error;
  }
};
