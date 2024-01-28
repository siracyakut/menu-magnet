import MenuList from "~/pages/manage-menus/menu-list";
import CreateMenu from "~/pages/manage-menus/create-menu";
import { motion } from "framer-motion";

const containerMotion = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ManageMenus() {
  return (
    <motion.div
      variants={containerMotion}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-10"
    >
      <MenuList />
      <CreateMenu />
    </motion.div>
  );
}
