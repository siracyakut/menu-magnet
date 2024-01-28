import Yup from "~/validations/yup";

export const createCategorySchema = Yup.object().shape({
  name: Yup.string().min(3).max(32).required(),
  description: Yup.string().min(3).max(256).required(),
});
