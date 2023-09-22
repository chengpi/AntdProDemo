import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducer from './reducers';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['account']
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
