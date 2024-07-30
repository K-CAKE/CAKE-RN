import { useState } from 'react';
import { supabase } from './supabase';
import { Alert } from 'react-native';

export function useUploadImage() {
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const uploadImage = async (uri: string) => {
        try {
            setUploading(true);

            const response = await fetch(uri);
            const blob = await response.blob();

            const fileName = `public/${Date.now()}.jpg`;
            const { data, error } = await supabase.storage
                .from('images')
                .upload(fileName, blob, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                const url = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl;
                setUploadedUrl(url);
                Alert.alert('Success', 'Image uploaded successfully!');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while uploading the image.');
        } finally {
            setUploading(false);
        }
    };

    return {
        uploading,
        uploadedUrl,
        uploadImage
    };
}
