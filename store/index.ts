import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import calendarReducer from './slices/calendarSlice';
// import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

const persistConfig = {
  key: 'root',
  version: 0.1,
  storage: AsyncStorage,
  whitelist: ['user'], // Only persist the user object from auth state
};

const rootReducer = combineReducers({
  auth: authReducer,
  calendar: calendarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  // devTools: false,
  // enhancers: getDefaultEnhancers =>
  // getDefaultEnhancers().concat(devToolsEnhancer()),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
