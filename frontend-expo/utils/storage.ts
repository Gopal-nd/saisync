import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  await AsyncStorage.setItem('jwt_token', token);
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('jwt_token');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('jwt_token');
};
