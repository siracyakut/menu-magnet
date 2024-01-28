import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import MENU from "~/constants/menu";
import { Link, useLocation } from "react-router-dom";
import Button from "~/components/button";
import { setModal } from "~/store/modal/actions";
import { useEffect, useRef } from "react";
import { useClickAway } from "react-use";
import PropTypes from "prop-types";

export default function HamburgerMenu({ open, setOpen, user, logoutMutation }) {
  const ref = useRef(null);
  const { pathname } = useLocation();

  useClickAway(ref, () => setOpen(false));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="z-[5] w-full h-screen bg-black/50 fixed inset-0 backdrop-blur flex items-center justify-end"
        >
          <motion.div
            initial={{ opacity: 0, translateX: 20 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: 20 }}
            ref={ref}
            className="w-2/3 h-full bg-[#282828] p-5"
          >
            <div className="w-full flex items-center justify-between my-5">
              <p className="text-sm font-bold">NAVIGATION</p>
              <FaTimes size={20} onClick={() => setOpen((prev) => !prev)} />
            </div>
            {user && (
              <div className="flex items-center gap-x-2">
                <IoPerson size={20} />
                <p className="text-sm font-bold">{user.email}</p>
              </div>
            )}
            <div className="mt-10 flex flex-col gap-2">
              {MENU.map((menuItem, index) => (
                <Link
                  key={index}
                  to={menuItem.path}
                  className="font-bold py-1.5"
                >
                  {menuItem.name}
                </Link>
              ))}
              <div className="mt-4">
                {user ? (
                  <Button
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isLoading}
                    component="button"
                    variant="primary"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setOpen(false);
                      setModal("login");
                    }}
                    component="button"
                    variant="primary"
                  >
                    Customer Login
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

HamburgerMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  logoutMutation: PropTypes.any.isRequired,
};
