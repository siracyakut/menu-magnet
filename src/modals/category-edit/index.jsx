import { Form, Formik } from "formik";
import Input from "~/components/input";
import ICONS from "~/constants/icons";
import COLORS from "~/constants/colors";
import getHSL from "~/utils/hsl";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/button";
import { useState } from "react";
import { useAuth } from "~/store/auth/hooks";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { updateCategoryService } from "~/services/category";
import toast from "react-hot-toast";
import Loading from "~/components/loading";
import { getBusinessService } from "~/services/business";
import { closeModal } from "~/store/modal/actions";
import { createCategorySchema } from "~/validations";
import ErrorBox from "~/components/error-box";

export default function CategoryEditModal({ data }) {
  const [selected, setSelected] = useState(data.icon);
  const user = useAuth();
  const queryClient = useQueryClient();

  const {
    data: businessData,
    error,
    isFetching,
  } = useQuery(["businessModalData", user.businessId], () =>
    getBusinessService({ id: user.businessId }),
  );

  const mutation = useMutation({
    mutationFn: (data) => updateCategoryService(data),
    onSuccess: async () => {
      await queryClient.refetchQueries(["categories", user.businessId]);
      closeModal();
      toast.success("Category updated successfully!");
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
      }}
      validationSchema={createCategorySchema}
      onSubmit={(values) =>
        mutation.mutate({
          id: data._id,
          name: values.name,
          description: values.description,
          icon: selected,
        })
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
          <div className="p-2 grid grid-cols-4 md:grid-cols-5 gap-y-5 place-items-center max-h-[250px] overflow-y-auto">
            {ICONS.map((icon, index) => (
              <div
                key={index}
                onClick={() => setSelected(index)}
                style={{
                  "--color": COLORS.at(businessData.data.color),
                  "--text": getHSL(COLORS.at(businessData.data.color)),
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
          Save
        </Button>
      </Form>
    </Formik>
  );
}
