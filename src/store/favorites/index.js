import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favorites = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    _addFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    _removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((f) => f._id !== action.payload);
    },
  },
});

export const { _addFavorites, _removeFavorite } = favorites.actions;
export default favorites.reducer;
