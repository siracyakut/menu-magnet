import Yup from "~/validations/yup";

export const contactSchema = Yup.object().shape({
  title: Yup.string().required().min(3).max(24),
  email: Yup.string().email().required(),
  inoviceId: Yup.string().length(
    32,
    "Inovice ID must be exactly 32 characters",
  ),
  message: Yup.string().min(10).max(500).required(),
});
