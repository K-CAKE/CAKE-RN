import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import * as aesjs from 'aes-js';
import 'react-native-get-random-values';
import { Database } from '@/database.types';
import { AppState } from 'react-native';
// import { Platform } from 'react-native';
class LargeSecureStore {
  private async _encrypt(key: string, value: string) {
    try {
      const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));

      const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
      const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

      await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));

      return aesjs.utils.hex.fromBytes(encryptedBytes);
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  }

  private async _decrypt(key: string, value: string) {
    try {
      const encryptionKeyHex = await SecureStore.getItemAsync(key);
      if (!encryptionKeyHex) {
        return encryptionKeyHex;
      }

      const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(encryptionKeyHex), new aesjs.Counter(1));
      const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

      return aesjs.utils.utf8.fromBytes(decryptedBytes);
    } catch (error) {
      console.error('Decryption error:', error);
      throw error;
    }
  }

  async getItem(key: string) {
    try {
      const encrypted = await AsyncStorage.getItem(key);
      if (!encrypted) {
        return encrypted;
      }

      return await this._decrypt(key, encrypted);
    } catch (error) {
      console.error('Get item error:', error);
      throw error;
    }
  }

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Remove item error:', error);
      throw error;
    }
  }

  async setItem(key: string, value: string) {
    try {
      const encrypted = await this._encrypt(key, value);
      await AsyncStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Set item error:', error);
      throw error;
    }
  }
}
// class SupabaseStorage { // None Encryption(for web)
//   async getItem(key: string) {
//     if (Platform.OS === "web") {
//       if (typeof localStorage === "undefined") {
//         return null;
//       }
//       return localStorage.getItem(key);
//     }
//     return AsyncStorage.getItem(key);
//   }
//   async removeItem(key: string) {
//     if (Platform.OS === "web") {
//       return localStorage.removeItem(key);
//     }
//     return AsyncStorage.removeItem(key);
//   }
//   async setItem(key: string, value: string) {
//     if (Platform.OS === "web") {
//       return localStorage.setItem(key, value);
//     }
//     return AsyncStorage.setItem(key, value);
//   }
// }
export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  {
    auth: {
      storage: new LargeSecureStore(),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
