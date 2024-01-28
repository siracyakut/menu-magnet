import { Form, Formik } from "formik";
import Input from "~/components/input";
import Button from "~/components/button";
import { useMutation, useQueryClient } from "react-query";
import { businessCreateService } from "~/services/business";
import { closeModal } from "~/store/modal/actions";
import toast from "react-hot-toast";
import COLORS from "~/constants/colors";
import { useState } from "react";
import classNames from "classnames";
import { businessCreateSchema } from "~/validations";
import { useAuth } from "~/store/auth/hooks";
import { setUser } from "~/store/auth/actions";

export default function BusinessCreateModal() {
  const user = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => businessCreateService(data),
    onSuccess: async (d) => {
      await setUser(d.data.user);
      await queryClient.refetchQueries(["businessInfo", user._id]);
      closeModal();
      toast.success("Your business created successfully!");
    },
    onError: (error) => toast.error(error.data),
  });

  const [selected, setSelected] = useState(
    Math.floor(Math.random() * COLORS.length),
  );

  return (
    <Formik
      initialValues={{
        business: "",
      }}
      validationSchema={businessCreateSchema}
      onSubmit={(values) => mutation.mutate({ ...values, color: selected })}
    >
      <Form className="grid gap-y-4">
        <Input name="business" label="Your Business Name:" />
        <div className="mb-2 max-h-[200px] overflow-y-auto md:max-h-none md:overflow-visible">
          <p className="font-semibold mb-2.5 text-[16px] leading-[19px]">
            Your Business Color:
          </p>
          <div className="grid grid-cols-5 md:grid-cols-9 place-items-center gap-4">
            {COLORS.map((color, index) => (
              <div
                onClick={() => setSelected(index)}
                key={index}
                style={{ "--color": color }}
                className={classNames(
                  "w-8 h-8 rounded-full bg-[var(--color)] cursor-pointer hover:ring-4 hover:ring-blue-500 transition-all",
                  {
                    "ring-4 ring-blue-500": selected === index,
                  },
                )}
              />
            ))}
          </div>
        </div>
        <Button
          disabled={mutation.isLoading}
          type="submit"
          component="button"
          variant="primary"
        >
          Save
        </Button>
      </Form>
    </Formik>
  );
}
