import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';
import { AxiosResponse } from 'axios';

export const getUsers = createAsyncThunk<IGetUserResponse[], void>(
  'getUsers',
  async function (request, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.get('users');
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getUserById = createAsyncThunk<IGetUserResponse, string>(
  'getUserById',
  async function (userId, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.get(`users/${userId}`);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const updateUserById = createAsyncThunk<IGetUserResponse, IUpdateUserByIdRequest>(
  'updateUserById',
  async function ({ userId, ...rest }, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.put(`users/${userId}`, rest);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const deleteUserById = createAsyncThunk<IGetUserResponse, string>(
  'deleteUserById',
  async function (userId, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.delete(`users/${userId}`);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

// TODO test
