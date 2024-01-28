import { Form, Formik } from "formik";
import { businessCreateSchema } from "~/validations";
import Input from "~/components/input";
import Button from "~/components/button";
import COLORS from "~/constants/colors";
import classNames from "classnames";
import { useMutation } from "react-query";
import { businessUpdateService } from "~/services/business";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const itemMotion = {
  hidden: {
    opacity: 0,
    translateY: 20,
  },
  visible: {
    opacity: 1,
    translateY: 0,
  },
};

export default function Options({ data, selected, setSelected, refetch }) {
  const mutation = useMutation({
    mutationFn: (data) => businessUpdateService(data),
    onSuccess: async () => {
      await refetch();
      toast.success("Business updated successfully!");
    },
    onError: (error) => toast.error(error.data),
  });

  return (
    <motion.div variants={itemMotion} className="grid md:grid-cols-2 gap-4">
      <div className="w-full bg-secondary rounded-[15px] p-5 flex flex-col gap-4">
        <p className="font-bold text-2xl text-center">Change Business Name</p>
        <Formik
          initialValues={{
            business: data?.data.name,
          }}
          validationSchema={businessCreateSchema}
          onSubmit={(values) => mutation.mutate({ business: values.business })}
        >
          <Form className="grid gap-y-4">
            <Input name="business" label="New Business Name:" />
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
      </div>
      <div className="w-full bg-secondary rounded-[15px] p-5 flex flex-col gap-4">
        <p className="font-bold text-2xl text-center">Change Business Color</p>
        <div className="grid grid-cols-5 md:grid-cols-9 place-items-center p-2 gap-4 max-h-[200px] overflow-y-auto md:max-h-none">
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
        <Button
          onClick={() => mutation.mutate({ color: selected })}
          disabled={mutation.isLoading}
          component="button"
          variant="primary"
        >
          Save
        </Button>
      </div>
    </motion.div>
  );
}

Options.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
