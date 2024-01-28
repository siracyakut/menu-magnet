import { motion } from "framer-motion";
import HomeIntroduction from "~/pages/home/introduction";
import { useAuth } from "~/store/auth/hooks";
import HomeUserArea from "~/pages/home/user-area";

const containerMotion = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const user = useAuth();

  return (
    <motion.div
      variants={containerMotion}
      initial="hidden"
      animate="visible"
      className="mx-auto w-full flex flex-col gap-8"
    >
      {user ? <HomeUserArea /> : <HomeIntroduction />}
    </motion.div>
  );
}
