import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';
import { AxiosResponse } from 'axios';

export const getBoards = createAsyncThunk<IGetBoardResponse[], void>(
  'getBoards',
  async function (request, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.get('boards');
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const createBoard = createAsyncThunk<IGetBoardResponse, ICreateBoardRequest>(
  'createBoard',
  async function (request, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.post('boards', request);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getBoardById = createAsyncThunk<IGetBoardResponse, string>(
  'getBoardById',
  async function (boardId, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.get(`boards/${boardId}`);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const updateBoardById = createAsyncThunk<IGetBoardResponse, IUpdateBoardByIdRequest>(
  'updateBoardById',
  async function ({ boardId, ...rest }, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.put(`boards/${boardId}`, rest);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const deleteBoardById = createAsyncThunk<IGetBoardResponse, string>(
  'deleteBoardById',
  async function (boardId, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.delete(`boards/${boardId}`);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

// TODO test

export const getBoardsByIds = createAsyncThunk<IGetBoardResponse[], string>(
  'getBoardsByIds',
  async function (userId, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.get(`boards/${userId}`);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getBoardsByUserId = createAsyncThunk<IGetBoardResponse[], string>(
  'getBoardsByUserId',
  async function (userId, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.get(`boardsSet/${userId}`);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
