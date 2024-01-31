import { post } from "~/utils/request";

export const createTicketService = (data) => post("/ticket/create", data);
