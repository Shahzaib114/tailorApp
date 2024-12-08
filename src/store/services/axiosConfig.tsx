import axios from 'axios';
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {Constant_Values} from '@utils/appConstants';
import {PROD_URL} from './tempEnv';
import { store } from '../store';
export const navigationRef = createNavigationContainerRef();

function navigate() {
  AsyncStorage.clear();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'AuthStackScreens'}],
      }),
    );
  }
}
const dataServer = axios.create({
  baseURL: PROD_URL,
  timeout: 100000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  headers: {
    'Content-Type': 'application/json',
  },
});
dataServer.interceptors.request.use(
  config =>
    new Promise((resolve, reject) => {
      NetInfo.addEventListener(async state => {
        const s = store.getState();
        const accessToken = s?.appData?.LoginData?.token
          ? s?.appData?.LoginData?.token
          : undefined;

        if (!state.isConnected) {
          return reject({
            message: 'Connectivity issue: No internet connection.',
          });
        }
        if (config.data && config.data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data';
        }
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return resolve(config);
      });
    }),
);

dataServer.interceptors.response.use(
  response => response.data,
  error => {
    console.log('error', error.response.data);
    if (error?.response?.status === 401) {
      // Alert.alert('token expired try loggin again');
      navigate();
    }
    return Promise.reject(error);
  },
);

export const gptSpeechToTextInstance = axios.create({
  baseURL: Constant_Values.STTBaseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${Constant_Values.GPT_KEY}`,
  },
});

export const gptInstance = axios.create({
  baseURL: Constant_Values.GPTInstanceBaseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Constant_Values.GPT_KEY}`,
  },
});

export {dataServer};
