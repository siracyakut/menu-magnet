import { Form, Formik } from "formik";
import Input from "~/components/input";
import Button from "~/components/button";
import { useState } from "react";
import { useAuth } from "~/store/auth/hooks";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCategoriesService } from "~/services/category";
import toast from "react-hot-toast";
import Loading from "~/components/loading";
import { closeModal } from "~/store/modal/actions";
import { createMenuSchema } from "~/validations";
import ErrorBox from "~/components/error-box";
import { updateMenuService } from "~/services/menu";

export default function MenuEditModal({ data }) {
  const user = useAuth();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: categoriesData,
    error,
    isFetching,
  } = useQuery(
    ["menuCategoriesModal", user.businessId],
    () => getCategoriesService({ businessId: user.businessId }),
    {
      onSuccess: (d) =>
        setSelectedCategory(d.data.find((c) => c._id === data.categoryId).name),
    },
  );

  const mutation = useMutation({
    mutationFn: (data) => updateMenuService(data),
    onSuccess: async () => {
      await queryClient.refetchQueries(["menus", user.businessId]);
      closeModal();
      toast.success("Menu updated successfully!");
    },
    onError: (error) => toast.error(error.data),
  });

  return isFetching ? (
    <Loading inline={true} />
  ) : error ? (
    <ErrorBox>{error.data}</ErrorBox>
  ) : (
    <Formik
      initialValues={{
        name: data.name,
        description: data.description,
        price: data.price,
      }}
      validationSchema={createMenuSchema}
      onSubmit={(values) =>
        mutation.mutate({
          id: data._id,
          ...values,
          categoryId: categoriesData.data.find(
            (c) => c.name === selectedCategory,
          )._id,
          businessId: user.businessId,
        })
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
            {categoriesData.data.map((category, index) => (
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
          Save
        </Button>
      </Form>
    </Formik>
  );
}
