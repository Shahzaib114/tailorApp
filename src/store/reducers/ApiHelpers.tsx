import { createAsyncThunk } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { dataServer } from '../services/axiosConfig';

export const searchUser: any = createAsyncThunk(
    'app/searchUser',
    async (
        {
            seriolNo,
            phoneNumber,
        }: {
            seriolNo: string;
            phoneNumber: string;
        },
        { rejectWithValue },
    ) => {
        try {
            const payload = {
                seriolNo,
                phoneNumber,
            };

            const response: any = await dataServer.post('auth/sign-in', payload);

            if (response?.success === true) {
                //   await AsyncStorage.setItem('AccessTokken', response?.data?.token);
                return response?.data;
            } else {
                Toast.show({
                    type: 'error',
                    text1: response.message,
                });
                return rejectWithValue(response.message);
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to login');
        }
    },
);
