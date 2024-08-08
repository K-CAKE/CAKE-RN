export const calculateTaxiFare = (distanceKm: number | null, speedKmh: number = 14.6): number => {
  if (distanceKm === null || isNaN(distanceKm)) {
    throw new Error('Inavalid distance');
  }
  // 기본 요금
  const baseFare = 4800;

  // 거리 요금 (0.131km당 100원)
  const distanceFare = Math.floor(distanceKm / 0.131) * 100;

  // 시간 요금 ((거리(km) / 14.6(km/h)) / 35(s)) * 100(원)
  // 1시간 = 3600초이므로 14.6km/h는 14.6km/3600s 입니다.
  const timeInHours = distanceKm / speedKmh;
  const timeFare = (Math.floor((timeInHours * 3600) / 35) * 100) / 3600;

  // 전체 요금
  const totalFare = baseFare + distanceFare + timeFare;

  return totalFare;
};
