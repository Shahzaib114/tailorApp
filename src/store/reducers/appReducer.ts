import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  acceptTransfer,
  bookableResourceBookings,
  BookingAPI,
  BookingDetailsAPI,
  createBuilding,
  createFloorLocation,
  createInventoryOrder,
  createLocationType,
  createZone,
  getAgreements,
  getAllBuildingsRelatedToZone,
  getAllLocationsRelatedToFloor,
  GetAssetLayerDetails,
  getAssetType,
  getBookableResourceBookingsPpms,
  getBookingsById,
  getCurrentTaskCalender,
  getEnvVariablesDispatch,
  getFloorOptionMetadata,
  GetLocationZones,
  getLpos,
  HomeScreenCount,
  loginAPI,
  SearchFilterAPI,
  updateBrb,
  updateTaskDetailsStatus,
  WorkOrderTypeAPI,
} from './ApiHelpers';
import {AppState, UserData} from '../../utils/AppInterfaceTypes';

const initialState: AppState = {
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
    userData: (state, action: PayloadAction<UserData>) => {
      state.UserData = action.payload;
    },

    setLoginState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    createLoctionData: (state, action: PayloadAction<any>) => {
      state.createLocationData = action.payload;
    },
    createAssetsData: (state, action: PayloadAction<any>) => {
      state.assetCreationData = action.payload;
    },
    createAssetsLayerData: (state, action: PayloadAction<any>) => {
      state.assetLayersCreationData = action.payload;
    },
    createAssetsHeirarchyData: (state, action: PayloadAction<any>) => {
      state.assetHeirarchyCreationData = action.payload;
    },
    createAssetsLocationData: (state, action: PayloadAction<any>) => {
      state.assetCreationDummyLocationsData = action.payload;
    },
    logoutUser: state => {
      state.isLoggedIn = false;
      state.UserData = {};
      state.LoginData = [];
      state.createLocationData = [];
      state.assetCreationData = [];
      state.assetLayersCreationData = [];
      state.assetHeirarchyCreationData = [];
      state.assetCreationDummyLocationsData = [];
    },
  },
  extraReducers: builder => {
    builder
      // loginAPI
  },
});

export const {
  userData,
  setLoginState,
  logoutUser,
  createLoctionData,
  createAssetsData,
  createAssetsLayerData,
  createAssetsLocationData,
  createAssetsHeirarchyData,
} = appData.actions;
export default appData.reducer;
