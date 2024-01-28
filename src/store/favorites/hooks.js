import { useSelector } from "react-redux";

export const useFavorites = () =>
  useSelector((state) => state.favorites.favorites);
