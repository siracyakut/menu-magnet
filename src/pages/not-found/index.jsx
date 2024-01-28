import Button from "~/components/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="px-4 text-center w-full flex flex-col items-center justify-center bg-secondary min-h-[350px] rounded-[15px] shadow-primaryShadow"
    >
      <h1 className="mb-[10px] font-extrabold text-[48px] leading-[56px]">
        Oh, that’s a 404!
      </h1>
      <p className="mb-4 font-bold text-[20px] leading-[23px]">
        It looks like you were trying to access a page that never existed.
      </p>
      <Button component={Link} to="/" variant="primary">
        Go Home
      </Button>
    </motion.div>
  );
}
