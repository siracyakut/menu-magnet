import Loading from "~/components/loading";
import { Form, Formik } from "formik";
import Input from "~/components/input";
import Button from "~/components/button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "~/store/auth/hooks";
import ErrorBox from "~/components/error-box";
import { getCategoriesService } from "~/services/category";
import { useState } from "react";
import { createMenuService } from "~/services/menu";
import toast from "react-hot-toast";
import { createMenuSchema } from "~/validations";
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

export default function CreateMenu() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const queryClient = useQueryClient();
  const user = useAuth();

  const { data, error, isFetching } = useQuery(
    ["categoryData", user.businessId],
    () => getCategoriesService({ businessId: user.businessId }),
  );

  const mutation = useMutation({
    mutationFn: (data) => createMenuService(data),
    onSuccess: async () => {
      await queryClient.refetchQueries(["menus", user.businessId]);
      toast.success("Menu created successfully!");
    },
    onError: (error) => toast.error(error.data),
  });

  return (
    <motion.div variants={itemMotion} className="flex flex-col gap-4">
      <h2 className="font-extrabold text-4xl">Create Menu</h2>
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
              price: 0,
            }}
            validationSchema={createMenuSchema}
            onSubmit={(values, formikHelpers) =>
              mutation.mutate(
                {
                  ...values,
                  categoryId: data.data.find((c) => c.name === selectedCategory)
                    ._id,
                  businessId: user.businessId,
                },
                {
                  onSuccess: () => {
                    formikHelpers.resetForm();
                    setSelectedCategory("");
                  },
                },
              )
            }
          >
            <Form className="grid gap-y-4">
              <Input name="name" label="Menu Name:" />
              <Input
                component="textarea"
                name="description"
                label="Menu Description:"
              />
              <div className="flex flex-col">
                <p className="font-semibold mb-2.5 text-[16px] leading-[19px]">
                  Menu Category:
                </p>
                <div className="w-full flex flex-wrap items-center gap-4">
                  {data.data.map((category, index) => (
                    <Button
                      key={index}
                      component="button"
                      type="button"
                      variant="primary"
                      selected={category.name === selectedCategory}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              <Input type="number" name="price" label="Menu Price:" />
              <Button
                disabled={mutation.isLoading || selectedCategory === ""}
                type="submit"
                component="button"
                variant="primary"
              >
                Create Menu
              </Button>
            </Form>
          </Formik>
        )}
      </div>
    </motion.div>
  );
}
