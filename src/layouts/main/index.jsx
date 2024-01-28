import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "~/layouts/main/header";
import { useModal } from "~/store/modal/hooks";
import Modal from "~/modals";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { authService } from "~/services/auth";
import { useEffect, useState } from "react";
import { destroyUser, setUser } from "~/store/auth/actions";
import Loading from "~/components/loading";
import Footer from "~/layouts/main/footer";
import { useAuth } from "~/store/auth/hooks";
import { setModal } from "~/store/modal/actions";

export default function MainLayout() {
  const [isOk, setIsOk] = useState(false);
  const { modal } = useModal();
  const user = useAuth();

  useQuery(["userAuth"], () => authService(), {
    onSuccess: (data) => {
      setUser(data.data);
      setIsOk(true);
    },
    onError: () => {
      destroyUser();
      setIsOk(true);
    },
  });

  useEffect(() => {
    if (isOk) {
      if (user && !user?.businessId) {
        setModal("business");
      }
    }
  }, [isOk]);

  return isOk ? (
    <div className="max-w-[1030px] w-full min-h-full px-[10px] mx-auto">
      {modal && <Modal />}
      <Header />
      <Outlet />
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      />
      <ScrollRestoration />
    </div>
  ) : (
    <Loading inline={false} />
  );
}
