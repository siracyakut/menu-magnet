import ReviewItem from "~/pages/reviews/review-item";
import REVIEWS from "~/mock/reviews";
import { motion } from "framer-motion";
import Title from "~/components/title";

const container = {
  visible: {
    transition: {
      staggerChildren: 0.075,
    },
  },
};

export default function Reviews() {
  return (
    <>
      <Title>Reviews</Title>
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid place-items-center md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {REVIEWS.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).map(
          (item, index) => (
            <ReviewItem key={index} item={item} />
          ),
        )}
      </motion.div>
    </>
  );
}
