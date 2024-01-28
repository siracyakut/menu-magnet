import Button from "~/components/button";
import { closeModal } from "~/store/modal/actions";
import { useMutation, useQueryClient } from "react-query";
import { deleteCategoryService } from "~/services/category";
import toast from "react-hot-toast";
import { useAuth } from "~/store/auth/hooks";

export default function CategoryDeleteModal({ data }) {
  const user = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => deleteCategoryService(data),
    onSuccess: async () => {
      await queryClient.refetchQueries(["categories", user.businessId]);
      toast.success("Category successfully deleted.");
      closeModal();
    },
    onError: (error) => toast.error(error.data),
  });

  return (
    <div className="flex flex-col gap-4 text-center">
      <p className="font-bold text-xl">Do you want to delete this category?</p>
      <p className="font-medium">
        If you perform this operation, all menus in this category will be
        deleted.
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        <Button
          onClick={() => mutation.mutate({ id: data._id })}
          disabled={mutation.isLoading}
          type="button"
          component="button"
          variant="primary"
        >
          Delete
        </Button>
        <Button
          onClick={closeModal}
          type="button"
          component="button"
          variant="light"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
