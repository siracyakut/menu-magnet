import { post } from "~/utils/request";

export const getMenusService = (data) => post("/menu/get", data);
export const createMenuService = (data) => post("/menu/create", data);
export const updateMenuService = (data) => post("/menu/update", data);
export const deleteMenuService = (data) => post("/menu/delete", data);
