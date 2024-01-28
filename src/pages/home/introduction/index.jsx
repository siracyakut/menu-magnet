import { motion } from "framer-motion";
import Button from "~/components/button";
import CountUp from "react-countup";
import { setModal } from "~/store/modal/actions";

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

export default function HomeIntroduction() {
  return (
    <>
      <motion.div
        variants={itemMotion}
        className="w-full flex items-center justify-center p-8 rounded-[15px] bg-secondary"
      >
        <div className="w-full md:w-[75%] flex flex-col items-center justify-center gap-5">
          <h2 className="text-center text-3xl md:text-5xl font-extrabold">
            Create your digital menu and start using it for free.
          </h2>
          <p className="text-xl font-bold text-center">
            Scan the QR code and view the sample menu or start creating your own
            menu now.
          </p>
          <div>
            <Button
              onClick={() => setModal("login")}
              component="button"
              variant="primary"
            >
              Try it for free!
            </Button>
          </div>
          <p className="w-full md:w-[80%] text-center text-sm font-bold">
            Of course, hookah bars, nightclubs, discos, cafes, hotels, catering,
            bars, cinemas, beer gardens, etc. Can also be used as a drinks menu
            or digital menu for!
          </p>
        </div>
      </motion.div>
      <motion.div variants={itemMotion} className="grid grid-cols-3 gap-2">
        <div className="bg-secondary p-5 rounded-[15px] flex flex-col items-center justify-center gap-2 text-center">
          <CountUp
            className="text-4xl text-primary font-extrabold"
            start={0}
            end={290}
          />
          <p className="text-white text-lg font-bold">Menus Generated</p>
        </div>
        <div className="bg-secondary p-5 rounded-[15px] flex flex-col items-center justify-center gap-2 text-center">
          <CountUp
            className="text-4xl text-primary font-extrabold"
            start={0}
            end={436}
          />
          <p className="text-white text-lg font-bold">Customers</p>
        </div>
        <div className="bg-secondary p-5 rounded-[15px] flex flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center gap-x-1 md:gap-x-2">
            <CountUp
              className="text-4xl text-primary font-extrabold"
              start={0}
              end={5}
              decimals={2}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 h-5 w-5 md:h-8 md:w-8"
            >
              <path d="M7.62109 12.2614L12.2175 15.0355L10.9977 9.80698L15.0586 6.28905L9.71103 5.83536L7.62109 0.904297L5.53116 5.83536L0.183594 6.28905L4.24447 9.80698L3.02472 15.0355L7.62109 12.2614Z"></path>
              <path
                d="M7.62109 12.2614L12.2175 15.0355L10.9977 9.80698L15.0586 6.28905L9.71103 5.83536L7.62109 0.904297L5.53116 5.83536L0.183594 6.28905L4.24447 9.80698L3.02472 15.0355L7.62109 12.2614Z"
                fill="url(#paint0_linear_3667_3571)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_3667_3571"
                  x1="7.62109"
                  y1="0.904297"
                  x2="7.62109"
                  y2="15.0355"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ff4544"></stop>
                  <stop offset="1" stopColor="#ff4544"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-white text-lg font-bold">Trusted</p>
        </div>
      </motion.div>
      <motion.div variants={itemMotion} className="grid md:grid-cols-2 gap-8">
        <div className="bg-secondary p-5 rounded-[15px] flex flex-col items-center justify-center gap-2">
          <h2 className="text-2xl text-center font-extrabold">Digital Menu</h2>
          <p className="text-base text-center font-medium">
            Menu Magnet has everything included, including table images and
            stickers with QR codes. By simply scanning the code, your guest can
            view your digital menu/drink menu instantly and without installing a
            special app on their smartphone.
          </p>
        </div>
        <div className="bg-secondary p-5 rounded-[15px] flex flex-col items-center justify-center gap-2">
          <h2 className="text-2xl text-center font-extrabold">
            No Smartphone App and No Server Required
          </h2>
          <p className="text-base text-center font-medium">
            Everything works in the browser! You can easily access and edit your
            menu(s) from anywhere. Your guests can instantly view your card by
            simply scanning the QR code, without requiring an app. You don't
            need a server, tablets or other complicated technology for your
            customers. Your guests only use their own smartphones and everything
            runs comfortably, maintenance-free and securely in the cloud!
          </p>
        </div>
      </motion.div>
    </>
  );
}
