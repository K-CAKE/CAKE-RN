import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Portal, PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    DeliveryScreen: undefined;
    DeliveryHistory: undefined;
    tutorial: undefined;
    Step2 : undefined;
};

const Step1 = () => {
  const [visible, setVisible] = React.useState(true);
  const [notificationVisible, setNotificationVisible] = React.useState(false);
  const [thirdModalVisible, setThirdModalVisible] = React.useState(false);
  const [fourthModalVisible, setFourthModalVisible] = React.useState(false);

  const navigation = useNavigation();

  const hideModal = () => setVisible(false);
  const showNotificationModal = () => {
    setVisible(false);
    setNotificationVisible(true);
  };
  
  const hideNotificationModal = () => {
    setNotificationVisible(false);
    setThirdModalVisible(true);
  };
  
  const hideThirdModal = () => {
    setThirdModalVisible(false);
    setFourthModalVisible(true);
  };

  const handleFinalConfirmPress = () => {
    setFourthModalVisible(false);
    navigation.navigate('Step2' as never); // Step2로 이동
  };

  return (
    <PaperProvider>
      <LinearGradient colors={['#F02F04', '#F5ECEA']} style={styles.gradientContainer}>
        <Portal>
          {/* 첫 번째 모달 */}
          <Modal visible={visible} onDismiss={hideModal} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.permissionBox}>
                <Text style={styles.title}>
                  고객님의 편리한 배달민족 이용을 위해 아래 접근권한의 허용이 필요합니다
                </Text>
                <Text style={styles.sectionTitle}>알림 (선택)</Text>
                <Text style={styles.description}>배달상태 실시간 알림 전송</Text>

                <Text style={styles.sectionTitle}>저장공간 (선택)</Text>
                <Text style={styles.description}>사진첨부 및 프로필 이미지 첨부</Text>

                <Text style={styles.sectionTitle}>위치 (선택)</Text>
                <Text style={styles.description}>현재위치 자동수신</Text>

                <Text style={styles.sectionTitle}>주소록 (선택)</Text>
                <Text style={styles.description}>
                  전화번호 및 기재된 노출, 선물하기 시 연락처 입력 편리성
                </Text>

                <Text style={styles.sectionTitle}>카메라 (선택)</Text>
                <Text style={styles.description}>주문 시 QR코드 스캔</Text>

                <Text style={styles.sectionTitle}>생체인증 (Face ID, 지문 등) (선택)</Text>
                <Text style={styles.description}>배달민족 비밀번호 대체하여 인증 편리성</Text>

                <Text style={styles.sectionTitle}>마이크, 그밖에 기타 권한, 접근 (선택)</Text>
                <Text style={styles.description}>배달민족 앱 통화 녹음 기능</Text>
              </View>

              <TouchableOpacity style={styles.confirmButton} onPress={showNotificationModal}>
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* 알림 모달 */}
          <Modal visible={notificationVisible} onDismiss={hideNotificationModal} transparent={true}>
            <View style={styles.notificationModalContainer}>
              <View style={styles.notificationBox}>
                <Text style={styles.notificationTitle}>
                  배달의민족에서 알림을 보내도록 허용하시겠습니까?
                </Text>
                <View style={styles.notificationButtonContainer}>
                  <Pressable style={styles.notificationButton} onPress={hideNotificationModal}>
                    <Text style={styles.notificationButtonText}>허용</Text>
                  </Pressable>
                  <Pressable style={styles.notificationButton} onPress={hideNotificationModal}>
                    <Text style={styles.notificationButtonText}>허용 안함</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          {/* 세 번째 모달 */}
          <Modal visible={thirdModalVisible} onDismiss={hideThirdModal} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.permissionBox}>
                <Text style={styles.title}>환영합니다!</Text>
                <Text style={styles.description}>아래 약관에 동의하시면 맛있는 여행이 시작됩니다</Text>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxLabel}>전체동의</Text>
                </View>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxLabel}>위치 기반 서비스 약관 동의 (필수)</Text>
                </View>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxLabel}>마케팅 정보 등 푸시 알림 수신 동의 (선택)</Text>
                  <Text style={styles.description}>이벤트 및 혜택 정보를 받아보실 수 있어요.</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.startButton} onPress={hideThirdModal}>
                <Text style={styles.startButtonText}>시작하기</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* 네 번째 모달 */}
          <Modal visible={fourthModalVisible} onDismiss={handleFinalConfirmPress} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.permissionBox}>
                <Text style={styles.title}>마케팅정보 앱 푸시 알림 거부 안내</Text>
                <Text style={styles.description}>
                  전송자: 배달의민족{'\n'}
                  수신거부 일시: 2024년 08월 06일 18시{'\n'}
                  처리내용: 수신거부 처리완료
                </Text>
                <Text style={styles.noteText}>* 환경 설정에서 변경 가능{'\n'}* 브랜드 캠페인 푸시 제외</Text>
              </View>

              <TouchableOpacity style={styles.confirmButton} onPress={handleFinalConfirmPress}>
                <Text style={styles.confirmButtonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </Portal>
      </LinearGradient>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: '20%',
  },
  permissionBox: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  noteText: {
    fontSize: 12,
    color: '#777',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#F02F04',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  notificationBox: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  notificationTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  notificationButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  notificationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  notificationButtonText: {
    color: '#F02F04',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  startButton: {
    backgroundColor: '#F02F04',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Step1;
