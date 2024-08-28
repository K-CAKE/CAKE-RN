import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Portal, PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  DeliveryScreen: undefined;
  DeliveryHistory: undefined;
  tutorial: undefined;
  Step2: undefined;
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
    navigation.navigate('Step2' as never); // Navigate to Step2
  };

  return (
    <PaperProvider>
      <LinearGradient colors={['#F02F04', '#F5ECEA']} style={styles.gradientContainer}>
        <Portal>
          {/* First Modal */}
          <Modal visible={visible} onDismiss={hideModal} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.permissionBox}>
                <Text style={styles.title}>
                  To enhance your experience with our delivery service, we require the following permissions.
                </Text>
                <Text style={styles.sectionTitle}>Notifications (Optional)</Text>
                <Text style={styles.description}>Receive real-time delivery status notifications.</Text>

                <Text style={styles.sectionTitle}>Storage (Optional)</Text>
                <Text style={styles.description}>Attach photos and profile images.</Text>

                <Text style={styles.sectionTitle}>Location (Optional)</Text>
                <Text style={styles.description}>Automatically receive your current location.</Text>

                <Text style={styles.sectionTitle}>Contacts (Optional)</Text>
                <Text style={styles.description}>
                  Access to your contacts for easy entry when sending gifts or other interactions.
                </Text>

                <Text style={styles.sectionTitle}>Camera (Optional)</Text>
                <Text style={styles.description}>Scan QR codes when placing orders.</Text>

                <Text style={styles.sectionTitle}>
                  Biometric Authentication (Face ID, Fingerprint, etc.) (Optional)
                </Text>
                <Text style={styles.description}>Convenient authentication without password using biometrics.</Text>

                <Text style={styles.sectionTitle}>Microphone and Other Permissions (Optional)</Text>
                <Text style={styles.description}>Enable call recording within the app.</Text>
              </View>

              <TouchableOpacity style={styles.confirmButton} onPress={showNotificationModal}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* Notification Modal */}
          <Modal visible={notificationVisible} onDismiss={hideNotificationModal} transparent={true}>
            <View style={styles.notificationModalContainer}>
              <View style={styles.notificationBox}>
                <Text style={styles.notificationTitle}>
                  Do you allow us to send notifications from the Delivery Service?
                </Text>
                <View style={styles.notificationButtonContainer}>
                  <Pressable style={styles.notificationButton} onPress={hideNotificationModal}>
                    <Text style={styles.notificationButtonText}>Allow</Text>
                  </Pressable>
                  <Pressable style={styles.notificationButton} onPress={hideNotificationModal}>
                    <Text style={styles.notificationButtonText}>Do Not Allow</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          {/* Third Modal */}
          <Modal visible={thirdModalVisible} onDismiss={hideThirdModal} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.permissionBox}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.description}>Agree to the terms below to start your delicious journey.</Text>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxLabel}>Agree to All</Text>
                </View>

                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxLabel}>Agree to Location-Based Services Terms (Required)</Text>
                </View>

                <View style={[styles.checkboxContainer, { marginBottom: 25 }]}>
                  <Text style={styles.checkboxLabel}>
                    Agree to Receive Marketing Information via Push Notifications (Optional)
                  </Text>
                </View>
                <Text style={styles.description}>You can receive information on events and benefits.</Text>
              </View>
              <TouchableOpacity style={styles.startButton} onPress={hideThirdModal}>
                <Text style={styles.startButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* Fourth Modal */}
          <Modal visible={fourthModalVisible} onDismiss={handleFinalConfirmPress} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.permissionBox}>
                <Text style={styles.title}>Marketing Information Push Notification Rejection Notice</Text>
                <Text style={styles.description}>
                  Sender: Delivery Service{'\n'}
                  Rejection Date and Time: August 6, 2024, 6:00 PM{'\n'}
                  Processed: Rejection Completed
                </Text>
                <Text style={styles.noteText}>
                  * Can be changed in settings{'\n'}* Excludes brand campaign push notifications
                </Text>
              </View>

              <TouchableOpacity style={styles.confirmButton} onPress={handleFinalConfirmPress}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
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
