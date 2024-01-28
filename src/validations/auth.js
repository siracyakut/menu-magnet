import Yup from "~/validations/yup";

export const businessCreateSchema = Yup.object().shape({
  business: Yup.string().min(5).max(32).required(),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(3).max(32).required(),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(3).max(32).required(),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match!")
    .required(),
});
