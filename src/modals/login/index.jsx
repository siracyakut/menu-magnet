import { Form, Formik } from "formik";
import Input from "~/components/input";
import Button from "~/components/button";
import Or from "~/components/or";
import { loginSchema } from "~/validations";
import { FcGoogle } from "react-icons/fc";
import { closeModal, setModal } from "~/store/modal/actions";
import { useMutation } from "react-query";
import { loginService } from "~/services/auth";
import { setUser } from "~/store/auth/actions";
import toast from "react-hot-toast";
import useGoogle from "~/hooks/use-google";

export default function LoginModal() {
  const loginMutation = useMutation({
    mutationFn: (data) => loginService(data),
    onSuccess: (data) => {
      setUser(data.data);
      closeModal();
      toast.success("You have successfully logged in.");
      if (!data.data.businessId) {
        setTimeout(() => setModal("business"), 300);
      }
    },
    onError: (error) => toast.error(error.data),
  });

  const { googleLogin, googleLoginMutation } = useGoogle();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => loginMutation.mutate(values)}
    >
      <Form className="grid gap-y-4">
        <Input label="E-Mail:" name="email" />
        <Input label="Password:" name="password" type="password" />
        <Button
          type="submit"
          disabled={loginMutation.isLoading}
          variant="primary"
          component="button"
        >
          Login
        </Button>
        <Or label="OR" />
        <Button
          disabled={googleLoginMutation.isLoading}
          onClick={() => googleLogin()}
          variant="light"
          component="button"
        >
          <div className="flex items-center gap-x-2.5">
            <FcGoogle size={20} />
            <p>Login with Google</p>
          </div>
        </Button>
        <div className="text-center text-sm mt-4 text-zinc-400">
          <p>You dont have an account?</p>
          <p>
            <span
              onClick={() => setModal("register")}
              className="hover:underline hover:text-primary cursor-pointer transition-all"
            >
              Click here
            </span>{" "}
            to sign up.
          </p>
        </div>
      </Form>
    </Formik>
  );
}
