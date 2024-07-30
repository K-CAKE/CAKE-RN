module.exports = ({ config }: { config: any }) => {
  return {
    ...config,
    plugins: [
      'expo-router',
      'expo-secure-store',
      'expo-build-properties',
      [
        '@mj-studio/react-native-naver-map',
        {
          client_id: process.env.EXPO_PUBLIC_NAVER_MAP_KEY,
          android: {
            ACCESS_FINE_LOCATION: true,
            ACCESS_COARSE_LOCATION: true,
            ACCESS_BACKGROUND_LOCATION: true,
          },
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            extraMavenRepos: ['https://repository.map.naver.com/archive/maven'],
          },
        },
      ],
    ],
  };
};
