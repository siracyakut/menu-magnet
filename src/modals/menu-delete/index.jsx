import Button from "~/components/button";
import { closeModal } from "~/store/modal/actions";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useAuth } from "~/store/auth/hooks";
import { deleteMenuService } from "~/services/menu";

export default function MenuDeleteModal({ data }) {
  const user = useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => deleteMenuService(data),
    onSuccess: async () => {
      await queryClient.refetchQueries(["menus", user.businessId]);
      toast.success("Menu successfully deleted.");
      closeModal();
    },
    onError: (error) => toast.error(error.data),
  });

  return (
    <div className="flex flex-col gap-4 text-center">
      <p className="font-bold text-xl">Do you want to delete this menu?</p>
      <p className="font-medium">This action cannot be undone.</p>
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
