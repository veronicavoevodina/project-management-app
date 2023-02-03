import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/auth-slice';
import usersReducer from './users/users-slice';
import boardsReducer from './boards/boards-slice';
import columnsReducer from './columns/columns-slice';
import tasksReducer from './tasks/tasks-slice';
import pointsReducer from './points/points-slice';
import { snackBarReducer } from './snackbar/snackbar-slice';

export const rootReducer = combineReducers({
  authReducer,
  usersReducer,
  boardsReducer,
  columnsReducer,
  pointsReducer,
  tasksReducer,
  snackBarReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
