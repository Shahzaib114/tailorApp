import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  searchUser
} from './ApiHelpers';

const initialState: any = {
  UserData: null,
  isLoggedIn: false,
  EnvVariables: null,
  BookingData: [],
  BookingCount: {},
  BookingDetails: {},
  HomeCount: {},
  WorkOrderType: {},
  createZoneData: null,
  ZoneData: [],
  createLocationData: null,
  assetCreationData: null,
  assetLayersCreationData: null,
  assetHeirarchyCreationData: null,
  assetCreationDummyLocationsData: null,
  buildingsData: [],
  createLoctionData: {},
  floorMetadata: {},
  locationsData: [],
  Agreements: [],
  createFloorLocationData: null,
  createLocationTypeData: null,
  LoginData: null,
  loading: false,
  error: null,
  myLpos: [],
  getEnvVariablesDispatch: null,
};

const appData = createSlice({
  name: 'allStates',
  initialState,
  reducers: {
    isLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    userData: (state, action: PayloadAction<any>) => {
      state.UserData = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // loginAPI
      .addCase(searchUser.pending, state => {
        state.loading = true;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const {
  userData,
} = appData.actions;
export default appData.reducer;
