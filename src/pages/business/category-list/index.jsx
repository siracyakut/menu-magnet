import { useQuery } from "react-query";
import { getCategoriesService } from "~/services/category";
import Loading from "~/components/loading";
import ErrorBox from "~/components/error-box";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronDown, FaChevronUp, FaHeart } from "react-icons/fa6";
import { formatMoney } from "~/utils/formatters";
import { getMenusService } from "~/services/menu";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ICONS from "~/constants/icons";
import getHSL from "~/utils/hsl";
import classNames from "classnames";
import { useFavorites } from "~/store/favorites/hooks";
import { addFavorites, removeFavorite } from "~/store/favorites/actions";

export default function CategoryList({ businessId, color }) {
  const [menus, setMenus] = useState({});
  const favorites = useFavorites();

  const { data, error, isFetching } = useQuery(["categories"], () =>
    getCategoriesService({ businessId }),
  );

  const { error: menuError, isFetching: menuFetching } = useQuery(
    ["menus"],
    () => getMenusService({ businessId }),
    {
      onSuccess: (data) => {
        const groupedMenus = {};

        data.data.forEach((menu) => {
          const category = menu.categoryId;
          if (!groupedMenus[category]) {
            groupedMenus[category] = [];
          }
          groupedMenus[category].push(menu);
        });

        setMenus(groupedMenus);
      },
    },
  );

  const handleFavorite = (menu) => {
    const fav = favorites.find((f) => f._id === menu._id);
    if (fav) {
      removeFavorite(menu._id);
    } else {
      addFavorites(menu);
    }
  };

  return !isFetching && !menuFetching ? (
    !error && !menuError ? (
      <div className="flex flex-col gap-12">
        {Object.entries(menus).map(([key, value], index) => (
          <div key={index} className="flex flex-col gap-4">
            <Disclosure defaultOpen={true}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between gap-x-4 bg-white/10 border border-white/30 p-2.5 rounded-lg outline-none">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-x-3">
                        <FontAwesomeIcon
                          className="flex-shrink-0"
                          icon={ICONS.at(
                            data.data.find((d) => d._id === key).icon,
                          )}
                          size="xl"
                        />
                        <p className="text-left text-xl md:text-2xl font-extrabold break-all">
                          {data.data.find((d) => d._id === key).name}
                        </p>
                      </div>
                      <p className="text-left text-sm font-bold">
                        {data.data.find((d) => d._id === key).description}
                      </p>
                    </div>
                    {open ? (
                      <FaChevronUp className="flex-shrink-0" size={20} />
                    ) : (
                      <FaChevronDown className="flex-shrink-0" size={20} />
                    )}
                  </Disclosure.Button>
                  <Transition
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-225 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Disclosure.Panel className="grid gap-4 px-4">
                      {value.map((menu, i) => (
                        <div
                          key={i}
                          className="flex flex-col gap-4 bg-white/10 border border-white/30 p-4 rounded-lg break-all"
                        >
                          <div className="flex items-center justify-between gap-x-2">
                            <div className="flex items-center gap-x-4">
                              <p
                                style={{
                                  "--color": color,
                                  "--text": getHSL(color),
                                }}
                                className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[var(--color)] text-[var(--text)] flex items-center justify-center font-extrabold"
                              >
                                {i + 1}
                              </p>
                              <p className="text-2xl font-extrabold">
                                {menu.name}
                              </p>
                            </div>
                            <FaHeart
                              onClick={() => handleFavorite(menu)}
                              size={24}
                              className={classNames(
                                "flex-shrink-0 text-white cursor-pointer",
                                {
                                  "!text-red-600": favorites.find(
                                    (f) => f._id === menu._id,
                                  ),
                                },
                              )}
                            />
                          </div>
                          <p className="text-sm font-bold">
                            {menu.description}
                          </p>
                          <p className="text-sm font-bold">
                            {formatMoney(menu.price)}
                          </p>
                        </div>
                      ))}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    ) : (
      <ErrorBox>{error?.data || menuError?.data}</ErrorBox>
    )
  ) : (
    <Loading inline={true} />
  );
}
