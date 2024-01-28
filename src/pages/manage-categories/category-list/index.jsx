import Loading from "~/components/loading";
import { useQuery } from "react-query";
import { getCategoriesService } from "~/services/category";
import { useAuth } from "~/store/auth/hooks";
import { FaPencil } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ICONS from "~/constants/icons";
import { setModal } from "~/store/modal/actions";
import ErrorBox from "~/components/error-box";
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

export default function CategoryList() {
  const user = useAuth();

  const { data, error, isFetching } = useQuery(
    ["categories", user.businessId],
    () => getCategoriesService({ businessId: user.businessId }),
  );

  return (
    <motion.div variants={itemMotion} className="flex flex-col gap-4">
      <h2 className="font-extrabold text-4xl">My Categories</h2>
      <div className="w-full bg-secondary rounded-[15px] p-5">
        {isFetching ? (
          <Loading inline={true} />
        ) : error ? (
          <ErrorBox>{error.data}</ErrorBox>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {data.data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 bg-white/10 border border-white/30 p-4 rounded-lg"
              >
                <FontAwesomeIcon
                  className="flex-shrink-0"
                  icon={ICONS.at(item.icon)}
                  size="xl"
                />
                <p className="font-bold text-xl break-all text-center">
                  {item.name}
                </p>
                <div className="flex items-center gap-x-2 flex-shrink-0">
                  <FaPencil
                    onClick={() => setModal("category-edit", item)}
                    className="w-[21px] h-6 hover:text-primary cursor-pointer transition-all"
                  />
                  <FaTimes
                    onClick={() => setModal("category-delete", item)}
                    className="w-[21px] h-6 hover:text-primary cursor-pointer transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
