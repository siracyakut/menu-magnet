import { Form, Formik } from "formik";
import Input from "~/components/input";
import Button from "~/components/button";
import Or from "~/components/or";
import { FcGoogle } from "react-icons/fc";
import { closeModal, setModal } from "~/store/modal/actions";
import { useMutation } from "react-query";
import { registerService } from "~/services/auth";
import { registerSchema } from "~/validations";
import toast from "react-hot-toast";
import { setUser } from "~/store/auth/actions";
import useGoogle from "~/hooks/use-google";

export default function RegisterModal() {
  const registerMutation = useMutation({
    mutationFn: (data) => registerService(data),
    onSuccess: (data) => {
      setUser(data.data);
      closeModal();
      toast.success("You have successfully registered.");
      setTimeout(() => setModal("business"), 300);
    },
    onError: (error) => toast.error(error.data),
  });

  const { googleLogin, googleLoginMutation } = useGoogle();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        passwordConfirm: "",
      }}
      validationSchema={registerSchema}
      onSubmit={(values) => registerMutation.mutate(values)}
    >
      <Form className="grid gap-y-4">
        <Input label="E-Mail:" name="email" />
        <Input label="Password:" name="password" type="password" />
        <Input
          label="Re-Type Password:"
          name="passwordConfirm"
          type="password"
        />
        <Button
          type="submit"
          disabled={registerMutation.isLoading}
          variant="primary"
          component="button"
        >
          Register
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
          <p>You already have an account?</p>
          <p>
            <span
              onClick={() => setModal("login")}
              className="hover:underline hover:text-primary cursor-pointer transition-all"
            >
              Click here
            </span>{" "}
            to sign in.
          </p>
        </div>
      </Form>
    </Formik>
  );
}
