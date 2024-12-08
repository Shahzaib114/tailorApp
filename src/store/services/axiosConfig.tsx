import axios from 'axios';
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {PROD_URL} from './tempEnv';
import { store } from '../store';
import { Alert } from 'react-native';
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
    if (error?.response?.status === 401) {
      // Alert.alert('token expired try loggin again');
      Alert.alert('token expired')
      navigate();
    }
    return Promise.reject(error);
  },
);

export {dataServer};
