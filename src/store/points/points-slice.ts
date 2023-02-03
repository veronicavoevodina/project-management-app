import { createSlice } from '@reduxjs/toolkit';
import {
  getPointsByIds,
  createPoint,
  updateSetOfPoints,
  getPointsByTaskId,
  updatePoint,
  deletePointById,
} from './points-thunks';

export interface IPointsState {
  points: IPointResponse[];
  pointsLoading: boolean;
  pointsError: IResponseError;

  createPointLoading: boolean;
  createPointError: IResponseError;

  updatePointsByIdLoading: boolean;
  updatePointsByIdError: IResponseError;

  getPointsByTaskId: IPointResponse[];
  getPointsByTaskIdLoading: boolean;
  getPointsByTaskIdError: IResponseError;

  updateSetOfPointsLoading: boolean;
  updateSetOfPointsError: IResponseError;

  deletePointLoading: boolean;
  deletePointError: IResponseError;
}

const initialState: IPointsState = {
  points: void 0,
  pointsLoading: void 0,
  pointsError: void 0,

  createPointLoading: void 0,
  createPointError: void 0,

  updatePointsByIdLoading: void 0,
  updatePointsByIdError: void 0,

  getPointsByTaskId: void 0,
  getPointsByTaskIdLoading: void 0,
  getPointsByTaskIdError: void 0,

  updateSetOfPointsLoading: void 0,
  updateSetOfPointsError: void 0,

  deletePointLoading: void 0,
  deletePointError: void 0,
};

export const PointsSlice = createSlice({
  initialState: initialState,
  name: 'points',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPointsByIds.pending, (state) => {
        state.pointsLoading = true;
        state.points = initialState.points;
        state.pointsError = initialState.pointsError;
      })
      .addCase(getPointsByIds.fulfilled, (state, action) => {
        state.pointsLoading = false;
        state.points = action.payload;
      })
      .addCase(getPointsByIds.rejected, (state, action) => {
        state.pointsLoading = false;
        state.pointsError = action.error as IResponseError;
      })

      .addCase(createPoint.pending, (state) => {
        state.createPointLoading = true;
        state.createPointError = initialState.createPointError;
      })
      .addCase(createPoint.fulfilled, (state, action) => {
        state.createPointLoading = false;
        state.points.push(action.payload);
      })
      .addCase(createPoint.rejected, (state, action) => {
        state.createPointLoading = false;
        state.createPointError = action.error as IResponseError;
      })

      .addCase(updateSetOfPoints.pending, (state) => {
        state.updatePointsByIdLoading = true;
        state.createPointError = initialState.createPointError;
      })
      .addCase(updateSetOfPoints.fulfilled, (state, action) => {
        state.updatePointsByIdLoading = false;
        state.points[state.points.indexOf(state.points.find((elem) => elem._id == action.payload._id))] =
          action.payload;
      })
      .addCase(updateSetOfPoints.rejected, (state, action) => {
        state.updatePointsByIdLoading = false;
        state.createPointError = action.error as IResponseError;
      })

      .addCase(getPointsByTaskId.pending, (state) => {
        state.getPointsByTaskIdLoading = true;
        state.points = initialState.points;
        state.updatePointsByIdError = initialState.updatePointsByIdError;
      })
      .addCase(getPointsByTaskId.fulfilled, (state, action) => {
        state.getPointsByTaskIdLoading = false;
        state.getPointsByTaskId = action.payload;
      })
      .addCase(getPointsByTaskId.rejected, (state, action) => {
        state.getPointsByTaskIdLoading = false;
        state.updatePointsByIdError = action.error as IResponseError;
      })

      .addCase(updatePoint.pending, (state) => {
        state.updateSetOfPointsLoading = true;
        state.points = initialState.points;
        state.updateSetOfPointsError = initialState.updateSetOfPointsError;
      })
      .addCase(updatePoint.fulfilled, (state, action) => {
        state.updateSetOfPointsLoading = false;
        const index = state.getPointsByTaskId.indexOf(
          state.getPointsByTaskId.find((elem) => elem._id == action.payload._id)
        );
        state.getPointsByTaskId[index] = { ...state.getPointsByTaskId[index], ...action.payload };
      })
      .addCase(updatePoint.rejected, (state, action) => {
        state.updateSetOfPointsLoading = false;
        state.updateSetOfPointsError = action.error as IResponseError;
      })

      .addCase(deletePointById.pending, (state) => {
        state.updateSetOfPointsLoading = true;
        state.points = initialState.points;
        state.updateSetOfPointsError = initialState.updateSetOfPointsError;
      })
      .addCase(deletePointById.fulfilled, (state, action) => {
        state.updateSetOfPointsLoading = false;
        state.getPointsByTaskId = state.getPointsByTaskId.filter((elem) => elem._id != action.payload._id);
      })
      .addCase(deletePointById.rejected, (state, action) => {
        state.updateSetOfPointsLoading = false;
        state.updateSetOfPointsError = action.error as IResponseError;
      });
  },
});

export default PointsSlice.reducer;
