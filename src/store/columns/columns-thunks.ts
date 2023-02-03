import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';
import { AxiosResponse } from 'axios';

export const getColumnsInBoard = createAsyncThunk<IColumnResponse[], string>(
  'getColumnsInBoard',
  async function (BoardId, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.get(`boards/${BoardId}/columns`);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const createColumn = createAsyncThunk<IColumnResponse, INewColumn>(
  'createColumn',
  async function ({ boardId, ...rest }, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.post(`boards/${boardId}/columns`, rest);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getColumnById = createAsyncThunk<IColumnResponse, IGetColumn>(
  'getColumnById',
  async function ({ boardId, columnId }, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.get(`boards/${boardId}/columns/${columnId}`);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const updateColumnById = createAsyncThunk<IColumnResponse, IUpdateColumn>(
  'updateColumnById',
  async function ({ boardId, columnId, ...rest }, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.put(`boards/${boardId}/columns/${columnId}`, rest);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const deleteColumn = createAsyncThunk<IColumnResponse, IDeleteColumn>(
  'deleteColumn',
  async function ({ boardId, columnId }, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.delete(`boards/${boardId}/columns/${columnId}`);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

// check it out i didnt test it
export const getColumnsByColumnId = createAsyncThunk<IColumnResponse[], string>(
  'getColumnsByColumnId',
  async function (userId, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.get(`columnsSet`, { params: userId });
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
// according to ids changes order of elements
export const updateSetOfColumns = createAsyncThunk<IColumnResponse[], IColumnRequest[]>(
  'updateSetOfColumns',
  async function (array, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.patch(`columnsSet`, array);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
// rewrite
export const createSetOfColumns = createAsyncThunk<IColumnResponse[], INewColumn[]>(
  'createSetOfColumns',
  async function (array, { rejectWithValue }) {
    try {
      const data: AxiosResponse = await api.post(`columnsSet`, array);
      return await data.data;
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
