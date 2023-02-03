import { createSlice } from '@reduxjs/toolkit';

type SeverityType = 'error' | 'warning' | 'info' | 'success';

export interface ISnackBarState {
  open: boolean;
  message: string;
  severity: SeverityType;
}

const initialState: ISnackBarState = {
  open: void 0,
  message: void 0,
  severity: 'success',
};

export const SnackBarSlice = createSlice({
  initialState: initialState,
  name: 'snackbar',
  reducers: {
    showMessage: (state, { payload }: { payload: ISnackBarState }) => {
      state.open = payload.open;
      state.message = payload.message;
      state.severity = payload.severity;
    },
    hideMessage: (state) => {
      state.open = false;
    },
  },
});

export const { showMessage, hideMessage } = SnackBarSlice.actions;

export const snackBarReducer = SnackBarSlice.reducer;
