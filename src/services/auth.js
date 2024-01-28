import { get, post } from "~/utils/request";

export const authService = () => get("/auth/auth");
export const googleLoginService = (data) => post("/auth/google-login", data);
export const loginService = (data) => post("/auth/login", data);
export const registerService = (data) => post("/auth/register", data);
export const logoutService = () => get("/auth/logout");
