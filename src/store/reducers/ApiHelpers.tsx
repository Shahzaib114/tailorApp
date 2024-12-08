import { createAsyncThunk } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { dataServer } from '../services/axiosConfig';

export const searchUser: any = createAsyncThunk(
    'app/searchUser',
    async (
        {
            seriolNo = 'Zohran',
            phoneNumber = '923435269496',
        }: {
            seriolNo: string;
            phoneNumber: string;
        },
        { rejectWithValue },
    ) => {
        try {
            const response: any = await dataServer.get(`user?phoneNumber=${phoneNumber}&name=${seriolNo}`);
            if (response?.success === true) {
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

export const searchOrder: any = createAsyncThunk(
    'app/searchOrder',
    async (
        {
            seriolNo = 'Zohran',
        }: {
            seriolNo: string;
        },
        { rejectWithValue },
    ) => {
        try {
            const response: any = await dataServer.get(`orderId=${seriolNo}`);
            console.log('ress', response)
            return
            if (response?.success === true) {
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

export const OrderNewUser: any = createAsyncThunk(
    'app/OrderNewUser',
    async (
        {
            payload
        }: {
            payload: any
        },
        { rejectWithValue },
    ) => {
        try {
            const response: any = await dataServer.get(`order`, payload);
            console.log('ress', response)
            if (response?.success === true) {
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
