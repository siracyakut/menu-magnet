import store from "~/store";
import { _addFavorites, _removeFavorite } from "~/store/favorites";

export const addFavorites = (data) => store.dispatch(_addFavorites(data));
export const removeFavorite = (data) => store.dispatch(_removeFavorite(data));
