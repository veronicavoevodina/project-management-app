import { createSlice } from '@reduxjs/toolkit';
import { parseJwt } from 'utils/parseJwt';
import { signIn, signUp } from '../auth/auth-thunks';

export interface IAuthState {
  userId: string;
  token: string;
  signInLoading: boolean;
  signInError: IResponseError;
  signUpLoading: boolean;
  signUpError: IResponseError;
}

const initialState: IAuthState = {
  token: void 0,
  userId: void 0,
  signInLoading: false,
  signInError: void 0,
  signUpLoading: false,
  signUpError: void 0,
};

const actualState: IAuthState = {
  token: localStorage.getItem('token'),
  userId: parseJwt(localStorage.getItem('token'))?.id ?? void 0,
  signInLoading: false,
  signInError: void 0,
  signUpLoading: false,
  signUpError: void 0,
};

export const testTokenForExp = (exp: number): boolean => {
  const expInMs = exp * 1000;
  const dateNowInMs = new Date().getTime();
  return dateNowInMs < expInMs;
};

export const authSlice = createSlice({
  initialState: actualState,
  name: 'auth',
  reducers: {
    logout: () => {
      localStorage.removeItem('token');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signInLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signInLoading = false;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        const { id } = parseJwt(action.payload.token);
        state.userId = id;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInError = action.error as IResponseError;
        state.signInLoading = false;
      })

      .addCase(signUp.pending, (state) => {
        state.signUpLoading = true;
      })
      .addCase(signUp.fulfilled, (state) => {
        state.signUpLoading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpError = action.error as IResponseError;
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
