import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
  isConnected: boolean;
  uid: string;
  account: string;
  token: string;
  user?: Record<string, any>;
};

const initialState: User = {
  isConnected: false,
  uid: '',
  account: '',
  token: '',
};

const userSlices = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<User, 'isConnected'>>) => {
      state.isConnected = true;
      state.uid = action.payload.uid;
      state.account = action.payload.account;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isConnected = false;
      state.uid = '';
      state.account = '';
      state.token = '';
      state.user = undefined;
    },
    setUser: (state, action: PayloadAction<Record<string, any> | undefined>) => {
      if (action.payload) {
        state.user = { ...action.payload };
      }
    },
  },
});

export const { login, logout, setUser } = userSlices.actions;

export default userSlices.reducer;
