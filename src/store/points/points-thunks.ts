import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

export const getPointsByIds = createAsyncThunk<IPointResponse[], IGetPointsIdsRequest>(
  'getPointsByIds',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`points`, { params: request });
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const createPoint = createAsyncThunk<IPointResponse, ICreatePointRequest>(
  'createPoint',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.post(`points`, request);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

// check request by idea it returns array but return object
export const updateSetOfPoints = createAsyncThunk<IPointResponse, IUpdateSetOfPoints[]>(
  'updateSetOfPoints',
  async function (array, { rejectWithValue }) {
    try {
      const data: Response = await api.patch(`points`, array);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getPointsByTaskId = createAsyncThunk<IPointResponse[], string>(
  'getPointsByTaskId',
  async function (path, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`points/${path}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const updatePoint = createAsyncThunk<IUpdatedPointResponse, IUpdatePoint>(
  'updatePoint',
  async function ({ pointId, ...array }, { rejectWithValue }) {
    try {
      const data: Response = await api.patch(`points/${pointId}`, array);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const deletePointById = createAsyncThunk<IDeletedPointResponse, string>(
  'deletePointById',
  async function (pointId, { rejectWithValue }) {
    try {
      const data: Response = await api.delete(`points/${pointId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
