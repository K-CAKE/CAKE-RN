import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useUploadImage } from '../../../hooks/useUploadImage';

// Define the types for the navigation routes
type RootStackParamList = {
  DeliveryScreen: undefined;
  Orders: undefined;
};

type DeliveryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeliveryScreen'>;

export default function DeliveryIndexScreen() {
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation<DeliveryScreenNavigationProp>();
  const { uploadedUrl, uploadImage } = useUploadImage();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await uploadImage(uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Step 3</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text>Tap to select an image</Text>
          </View>
        )}
      </TouchableOpacity>
      {uploadedUrl && (
        <View style={styles.uploadedUrlContainer}>
          <Text style={styles.uploadedUrlTitle}>Uploaded Image URL:</Text>
          <Text>{uploadedUrl}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="View my orders" onPress={() => navigation.navigate('Orders')} />
        <Button title="Order delivery" onPress={() => navigation.navigate('DeliveryScreen')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  uploadedUrlContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  uploadedUrlTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
