import { post } from "~/utils/request";

export const getCategoriesService = (data) => post("/category/get", data);
export const createCategoryService = (data) => post("/category/create", data);
export const updateCategoryService = (data) => post("/category/update", data);
export const deleteCategoryService = (data) => post("/category/delete", data);
