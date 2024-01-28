import QR from "~/components/qr";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

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

export default function QRArea({ data }) {
  return (
    <motion.div
      variants={itemMotion}
      className="w-full bg-secondary p-5 rounded-[15px] flex flex-col gap-4"
    >
      <div className="w-max mx-auto bg-white/10 border border-white/30 p-5 rounded-lg">
        <QR
          size={256}
          text={`${window.location.origin}/businesses/${data.data.slug}`}
        />
      </div>
      <h2 className="font-bold text-2xl text-center">
        QR Code of Your Business
      </h2>
    </motion.div>
  );
}

QRArea.propTypes = {
  data: PropTypes.object.isRequired,
};
