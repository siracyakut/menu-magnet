import { post } from "~/utils/request";

export const getBusinessService = (data) => post("/business/info", data);
export const businessCreateService = (data) => post("/business/create", data);
export const businessUpdateService = (data) => post("/business/update", data);
