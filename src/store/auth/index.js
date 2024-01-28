import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    _setUser: (state, action) => {
      state.user = action.payload;
    },
    _destroyUser: (state) => {
      state.user = false;
    },
  },
});

export const { _setUser, _destroyUser } = auth.actions;
export default auth.reducer;
