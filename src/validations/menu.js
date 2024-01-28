import Yup from "~/validations/yup";

export const createMenuSchema = Yup.object().shape({
  name: Yup.string().min(3).max(32).required(),
  description: Yup.string().min(3).max(256).required(),
  price: Yup.number().min(1).required(),
});
