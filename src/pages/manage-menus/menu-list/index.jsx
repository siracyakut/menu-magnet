import Loading from "~/components/loading";
import { useQuery } from "react-query";
import { useAuth } from "~/store/auth/hooks";
import ErrorBox from "~/components/error-box";
import { getMenusService } from "~/services/menu";
import { useState } from "react";
import { getCategoriesService } from "~/services/category";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronDown, FaChevronUp, FaPencil } from "react-icons/fa6";
import { setModal } from "~/store/modal/actions";
import { FaTimes } from "react-icons/fa";
import { formatMoney } from "~/utils/formatters";
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

export default function MenuList() {
  const user = useAuth();
  const [menus, setMenus] = useState({});

  const {
    data: categoriesData,
    error: categoriesError,
    isFetching: categoriesFetching,
  } = useQuery(["menuCategories", user.businessId], () =>
    getCategoriesService({ businessId: user.businessId }),
  );

  const { error, isFetching } = useQuery(
    ["menus", user.businessId],
    () => getMenusService({ businessId: user.businessId }),
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

  return (
    <motion.div variants={itemMotion} className="flex flex-col gap-4">
      <h2 className="font-extrabold text-4xl">My Menus</h2>
      <div className="w-full bg-secondary rounded-[15px] p-5">
        {isFetching || categoriesFetching ? (
          <Loading inline={true} />
        ) : error || categoriesError ? (
          <ErrorBox>{error.data || categoriesError.data}</ErrorBox>
        ) : (
          <div className="flex flex-col gap-8">
            {Object.entries(menus).map(([key, value], index) => (
              <div key={index} className="flex flex-col gap-4">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between bg-white/10 border border-white/30 p-2.5 rounded-lg outline-none">
                        <p className="text-xl md:text-2xl font-extrabold break-all">
                          {categoriesData.data.find((d) => d._id === key).name}
                        </p>
                        {open ? (
                          <FaChevronUp size={20} />
                        ) : (
                          <FaChevronDown size={20} />
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
                        <Disclosure.Panel className="grid md:grid-cols-2 gap-4">
                          {value.map((menu, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between gap-4 bg-white/10 border border-white/30 p-4 rounded-lg break-all"
                            >
                              <div className="flex flex-col">
                                <p className="text-2xl font-extrabold">
                                  {menu.name}
                                </p>
                                <p className="text-sm font-bold">
                                  {menu.description}
                                </p>
                                <p className="mt-2.5 text-sm font-bold">
                                  {formatMoney(menu.price)}
                                </p>
                              </div>
                              <div className="h-full flex flex-col justify-between">
                                <FaPencil
                                  onClick={() => setModal("menu-edit", menu)}
                                  className="w-[21px] h-6 hover:text-primary cursor-pointer transition-all"
                                />
                                <FaTimes
                                  onClick={() => setModal("menu-delete", menu)}
                                  className="w-[21px] h-6 hover:text-primary cursor-pointer transition-all"
                                />
                              </div>
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
        )}
      </div>
    </motion.div>
  );
}
