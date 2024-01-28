import store from "~/store";
import { _closeModal, _destroyModal, _setModal } from "~/store/modal";

export const setModal = (name, data = false) =>
  store.dispatch(_setModal({ name, data }));
export const destroyModal = () => store.dispatch(_destroyModal());
export const closeModal = () => {
  store.dispatch(_closeModal());
  setTimeout(destroyModal, 200);
};
