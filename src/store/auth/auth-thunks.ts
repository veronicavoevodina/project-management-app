import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import api from 'api/api';

export const signIn = createAsyncThunk<ISignInResponse, ISignInRequest>(
  'auth/signin',
  async function (request, { rejectWithValue }) {
    try {
      const data: AxiosResponse<ISignInResponse> = await api.post('auth/signin', request);
      return data.data;
    } catch (e: unknown) {
      return rejectWithValue({});
    }
  }
);

export const signUp = createAsyncThunk<ISignUpResponse, ISignUpRequest>(
  'auth/signup',
  async function (request, { rejectWithValue }) {
    try {
      const data: AxiosResponse<ISignUpResponse> = await api.post('auth/signup', request);
      return data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
