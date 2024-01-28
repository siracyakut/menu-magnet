import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

dayjs.extend(RelativeTime);

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

export default function ReviewItem({ item }) {
  return (
    <motion.div
      variants={itemMotion}
      className="p-[17px] w-[320px] flex flex-col bg-secondary rounded-[15px] shadow-primaryShadow hover:!scale-105 transition-all"
    >
      <div className="mb-[14px] flex items-center justify-between">
        <div className="flex items-center gap-x-0.5">
          {Array.from({ length: item.star }).map((_, index) => (
            <svg key={index} className="w-[18px] h-[18px]" viewBox="0 0 51 48">
              <path
                className="star"
                d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                style={{ fill: "rgb(255, 69, 68)" }}
              />
            </svg>
          ))}
        </div>
        <time className="text-[#898989] font-bold text-[14px]">
          {dayjs(item.date).fromNow()}
        </time>
      </div>
      <div className="mb-[17px] flex-1 font-bold">{item.review}</div>
      <div className="flex items-center gap-x-[10px]">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[19px] h-[15px]"
        >
          <path
            d="M3.50692 5.70619L1.25759 3.45685L0.507812 4.20663L3.50692 7.20574L9.93359 0.779075L9.18382 0.0292969L3.50692 5.70619Z"
            fill="url(#paint0_linear_3693_55)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3693_55"
              x1="5.2207"
              y1="0.0292969"
              x2="5.2207"
              y2="7.20574"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff4544"></stop>
              <stop offset="1" stopColor="#ff4544"></stop>
            </linearGradient>
          </defs>
        </svg>
        <p className="text-[#898989] font-bold text-[14px]">
          Verified Purchase
        </p>
      </div>
    </motion.div>
  );
}

ReviewItem.propTypes = {
  item: PropTypes.object.isRequired,
};
