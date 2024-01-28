import store from "~/store";
import { _destroyUser, _setUser } from "~/store/auth";

export const setUser = (data) => store.dispatch(_setUser(data));
export const destroyUser = () => store.dispatch(_destroyUser());
