import { configureStore } from "@reduxjs/toolkit";
import modal from "~/store/modal";
import auth from "~/store/auth";
import favorites from "~/store/favorites";

const store = configureStore({
  reducer: {
    modal,
    auth,
    favorites,
  },
  devTools: false,
});

export default store;
