import { useMutation } from "react-query";
import { googleLoginService } from "~/services/auth";
import { setUser } from "~/store/auth/actions";
import { closeModal, setModal } from "~/store/modal/actions";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function useGoogle() {
  const googleLoginMutation = useMutation({
    mutationFn: (data) => googleLoginService(data),
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

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      googleLoginMutation.mutate({ token: tokenResponse.access_token }),
  });

  return { googleLoginMutation, googleLogin };
}
