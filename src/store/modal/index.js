import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modal: false,
  data: false,
  isOpen: false,
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    _setModal: (state, action) => {
      state.modal = action.payload.name;
      state.data = action.payload.data;
      state.isOpen = true;
    },
    _closeModal: (state) => {
      state.isOpen = false;
    },
    _destroyModal: (state) => {
      state.modal = false;
      state.data = false;
      state.isOpen = false;
    },
  },
});

export const { _setModal, _destroyModal, _closeModal } = modal.actions;
export default modal.reducer;
