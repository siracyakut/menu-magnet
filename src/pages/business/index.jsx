import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getBusinessService } from "~/services/business";
import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import COLORS from "~/constants/colors";
import getHSL from "~/utils/hsl";
import CategoryList from "~/pages/business/category-list";
import { FaHeart } from "react-icons/fa6";
import { setModal } from "~/store/modal/actions";
import { useModal } from "~/store/modal/hooks";
import Modal from "~/modals";
import { useFavorites } from "~/store/favorites/hooks";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function BusinessPage() {
  const { modal } = useModal();
  const { slug } = useParams();
  const favorites = useFavorites();

  const { data, error, isFetching } = useQuery(["business"], () =>
    getBusinessService({ slug }),
  );

  return isFetching ? (
    <Loading inline={false} />
  ) : error ? (
    <ErrorBox>{error.data}</ErrorBox>
  ) : (
    <>
      <Helmet>
        <title>{data.data.name}</title>
      </Helmet>
      <div className="flex flex-col gap-10">
        {modal && <Modal />}
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
        <header
          style={{
            "--color": COLORS.at(data.data.color),
            "--text": getHSL(COLORS.at(data.data.color)),
          }}
          className="w-full p-5 bg-[var(--color)] text-[var(--text)] flex items-center justify-center text-center"
        >
          <p className="text-4xl font-extrabold">{data.data.name}</p>
        </header>
        <div className="md:max-w-[1030px] w-full mx-auto px-5">
          <CategoryList
            businessId={data.data._id}
            color={COLORS.at(data.data.color)}
          />
        </div>
        <button
          onClick={() => {
            if (favorites.length > 0) {
              setModal("favorites");
            } else {
              toast.error("You haven't chosen any favorite menu!");
            }
          }}
          type="button"
          className="fixed bottom-5 right-5 bg-secondary p-4 rounded-[15px] z-10 shadow-primaryShadow flex items-center gap-x-4 outline-none"
        >
          <FaHeart className="text-red-600" size={22} />
          <p className="hidden md:block text-xl font-bold">
            My Favorites{" "}
            {favorites.length > 0 && (
              <span className="hidden md:inline-block">
                ({favorites.length})
              </span>
            )}
          </p>
        </button>
      </div>
    </>
  );
}
