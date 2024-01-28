import Loading from "~/components/loading";
import { Form, Formik } from "formik";
import Input from "~/components/input";
import ICONS from "~/constants/icons";
import COLORS from "~/constants/colors";
import getHSL from "~/utils/hsl";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getBusinessService } from "~/services/business";
import { useAuth } from "~/store/auth/hooks";
import { useState } from "react";
import { createCategoryService } from "~/services/category";
import toast from "react-hot-toast";
import { createCategorySchema } from "~/validations";
import ErrorBox from "~/components/error-box";
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

export default function CreateCategory() {
  const [selected, setSelected] = useState(0);
  const user = useAuth();
  const queryClient = useQueryClient();

  const { data, error, isFetching } = useQuery(
    ["businessData", user.businessId],
    () => getBusinessService({ id: user.businessId }),
  );

  const mutation = useMutation({
    mutationFn: (data) => createCategoryService(data),
    onSuccess: async () => {
      await queryClient.refetchQueries(["categories", user.businessId]);
      toast.success("Category created successfully!");
    },
    onError: (error) => toast.error(error.data),
  });

  return (
    <motion.div variants={itemMotion} className="flex flex-col gap-4">
      <h2 className="font-extrabold text-4xl">Create Category</h2>
      <div className="w-full bg-secondary rounded-[15px] p-5">
        {isFetching ? (
          <Loading inline={true} />
        ) : error ? (
          <ErrorBox>{error.data}</ErrorBox>
        ) : (
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            validationSchema={createCategorySchema}
            onSubmit={(values, formikHelpers) =>
              mutation.mutate(
                { ...values, icon: selected },
                { onSuccess: () => formikHelpers.resetForm() },
              )
            }
          >
            <Form className="grid gap-y-4">
              <Input name="name" label="Category Name:" />
              <Input
                component="textarea"
                name="description"
                label="Category Description:"
              />
              <div className="flex flex-col">
                <p className="font-semibold mb-2.5 text-[16px] leading-[19px]">
                  Category Icon:
                </p>
                <div className="p-2 grid grid-cols-4 md:grid-cols-8 gap-y-5 place-items-center max-h-[250px] overflow-y-auto">
                  {ICONS.map((icon, index) => (
                    <div
                      key={index}
                      onClick={() => setSelected(index)}
                      style={{
                        "--color": COLORS.at(data.data.color),
                        "--text": getHSL(COLORS.at(data.data.color)),
                      }}
                      className={classNames(
                        "flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color)] text-[var(--text)] cursor-pointer hover:ring-4 hover:ring-blue-500 transition-all",
                        {
                          "ring-4 ring-blue-500": selected === index,
                        },
                      )}
                    >
                      <FontAwesomeIcon icon={icon} size="xl" />
                    </div>
                  ))}
                </div>
              </div>
              <Button
                disabled={mutation.isLoading}
                type="submit"
                component="button"
                variant="primary"
              >
                Create Category
              </Button>
            </Form>
          </Formik>
        )}
      </div>
    </motion.div>
  );
}
