import { useFavorites } from "~/store/favorites/hooks";
import { formatMoney } from "~/utils/formatters";
import { FaHeart } from "react-icons/fa6";
import { removeFavorite } from "~/store/favorites/actions";
import { useEffect } from "react";
import { closeModal } from "~/store/modal/actions";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function FavoritesModal() {
  const favorites = useFavorites();
  const [animationParent] = useAutoAnimate();

  useEffect(() => {
    if (favorites.length === 0) closeModal();
  }, [favorites]);

  return (
    <div
      ref={animationParent}
      className="pr-4 grid gap-y-4 max-h-[600px] overflow-y-auto overflow-x-hidden"
    >
      {favorites.map((item) => (
        <div
          key={item._id}
          className="flex flex-col gap-4 bg-white/10 border border-white/50 p-5 rounded-lg break-all"
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-xl font-extrabold">{item.name}</p>
              <p>{item.description}</p>
            </div>
            <FaHeart
              size={22}
              onClick={() => removeFavorite(item._id)}
              className="text-red-600 cursor-pointer"
            />
          </div>
          <p>{formatMoney(item.price)}</p>
        </div>
      ))}
    </div>
  );
}
