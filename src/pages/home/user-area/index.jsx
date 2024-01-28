import Loading from "~/components/loading";
import { useState } from "react";
import { useAuth } from "~/store/auth/hooks";
import { useQuery } from "react-query";
import { getBusinessService } from "~/services/business";
import { motion } from "framer-motion";
import Details from "~/pages/home/user-area/details";
import Options from "~/pages/home/user-area/options";
import ErrorBox from "~/components/error-box";
import QRArea from "~/pages/home/user-area/qr-area";

const containerMotion = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomeUserArea() {
  const [selected, setSelected] = useState(0);
  const user = useAuth();

  const { data, error, isFetching, refetch } = useQuery(
    ["businessInfo", user._id],
    () => getBusinessService({ id: user.businessId }),
    {
      enabled: user.businessId?.length > 0,
      onSuccess: (d) => setSelected(d.data.color),
    },
  );

  return (
    <>
      {isFetching ? (
        <Loading inline={true} />
      ) : error ? (
        <ErrorBox>{error.data}</ErrorBox>
      ) : (
        <motion.div
          className="flex flex-col gap-8"
          variants={containerMotion}
          initial="hidden"
          animate="visible"
        >
          <Details data={data} user={user} />
          {data?.data?.slug && <QRArea data={data} />}
          <Options
            data={data}
            setSelected={setSelected}
            refetch={refetch}
            selected={selected}
          />
        </motion.div>
      )}
    </>
  );
}
