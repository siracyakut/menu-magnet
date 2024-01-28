import CategoryList from "~/pages/manage-categories/category-list";
import CreateCategory from "~/pages/manage-categories/create-category";
import { motion } from "framer-motion";

const containerMotion = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ManageCategories() {
  return (
    <motion.div
      variants={containerMotion}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-10"
    >
      <CategoryList />
      <CreateCategory />
    </motion.div>
  );
}
