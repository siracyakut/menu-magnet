import { IoMdPerson } from "react-icons/io";
import { IoBusiness } from "react-icons/io5";
import PropTypes from "prop-types";
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

export default function Details({ user, data }) {
  return (
    <motion.div
      variants={itemMotion}
      className="w-full bg-secondary flex flex-col gap-5 items-center justify-center rounded-[15px] p-5"
    >
      <h2 className="font-extrabold text-4xl">Business Details</h2>
      <div className="flex items-center gap-x-2">
        <IoMdPerson size={24} />
        <p className="font-bold">{user.email}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <IoBusiness size={24} />
        <p className="font-bold">{data?.data.name}</p>
      </div>
    </motion.div>
  );
}

Details.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  data: PropTypes.object,
};
