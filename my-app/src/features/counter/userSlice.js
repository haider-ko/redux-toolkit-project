import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    signUp: (state, action) => {
      state.user = action.payload;

      console.log(state.user.password);
    },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const { signUp, login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
