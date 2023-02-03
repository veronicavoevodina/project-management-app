import { createSlice } from '@reduxjs/toolkit';
import { deleteUserById, getUserById, getUsers, updateUserById } from './users-thunks';

export interface IUsersState {
  users: IGetUserResponse[];
  usersLoading: boolean;
  usersError: IResponseError;

  userById: IGetUserResponse;
  userByIdLoading: boolean;
  userByIdError: IResponseError;

  updateUserLoading: boolean;
  updateUserError: IResponseError;

  deleteUserLoading: boolean;
  deleteUserError: IResponseError;
}

const initialState: IUsersState = {
  users: void 0,
  usersLoading: false,
  usersError: void 0,

  userById: void 0,
  userByIdLoading: false,
  userByIdError: void 0,

  updateUserLoading: false,
  updateUserError: void 0,

  deleteUserLoading: false,
  deleteUserError: void 0,
};

export const UsersSlice = createSlice({
  initialState: initialState,
  name: 'users',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.usersLoading = true;
        state.users = initialState.users;
        state.usersError = initialState.usersError;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.error as IResponseError;
      })

      .addCase(getUserById.pending, (state) => {
        state.userByIdLoading = true;
        state.userByIdError = initialState.updateUserError;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userByIdLoading = false;
        state.userById = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.userByIdLoading = false;
        state.userByIdError = action.error as IResponseError;
      })

      .addCase(updateUserById.pending, (state) => {
        state.updateUserLoading = true;
        state.updateUserError = initialState.updateUserError;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.updateUserLoading = false;
        state.users[state.users.indexOf(state.users.find((elem) => elem._id === action.payload._id))] = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.updateUserLoading = false;
        state.updateUserError = action.error as IResponseError;
      })

      .addCase(deleteUserById.pending, (state) => {
        state.deleteUserLoading = true;
        state.deleteUserError = initialState.updateUserError;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        state.users = state.users.filter((elem) => elem._id != action.payload._id);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.deleteUserLoading = false;
        state.deleteUserError = action.error as IResponseError;
      });
  },
});

export default UsersSlice.reducer;

// export const { logout } = authSlice.actions;
