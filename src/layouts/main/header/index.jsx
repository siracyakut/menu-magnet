import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import Button from "~/components/button";
import { setModal } from "~/store/modal/actions";
import MENU from "~/constants/menu";
import useBreakpoint from "~/hooks/use-breakpoint";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { useAuth } from "~/store/auth/hooks";
import { useMutation } from "react-query";
import { logoutService } from "~/services/auth";
import { destroyUser } from "~/store/auth/actions";
import toast from "react-hot-toast";
import { BiLogOut } from "react-icons/bi";
import HamburgerMenu from "~/layouts/main/header/hamburger-menu";
import UserButtons from "~/layouts/main/header/user-buttons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const breakpoint = useBreakpoint();
  const user = useAuth();

  const logoutMutation = useMutation({
    mutationFn: () => logoutService(),
    onSuccess: () => {
      destroyUser();
      setOpen(false);
      toast.success("You are successfully logged out.");
    },
    onError: (error) => toast.error(error.data),
  });

  return (
    <>
      <HamburgerMenu
        setOpen={setOpen}
        user={user}
        open={open}
        logoutMutation={logoutMutation}
      />
      <div className="flex flex-col gap-5 mb-[58px]">
        <div className="mt-5 w-full bg-primary text-center rounded-[10px] p-[12px_0_9px] text-[14px] uppercase font-bold shadow-primaryShadow">
          GET THE SAFEST AND STRONGEST QR MENU SERVICE HERE, FROM THE MENU
          MAGNET!
        </div>
        <div className="w-full bg-secondary p-[25px_32px] rounded-[15px] shadow-primaryShadow">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-8 h-8 rounded-full object-cover mr-[15px]"
              />
              <h2 className="text-[16px] font-extrabold mr-[10px]">
                Menu Magnet
              </h2>
              <div className="h-[18px] p-[0_5px] flex items-center justify-center border border-primary rounded-[5px]">
                <p className="text-primary font-bold text-[10px] leading-[1em] uppercase">
                  PRO
                </p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-x-4">
              {MENU.map((menuItem, index) => (
                <NavLink
                  key={index}
                  to={menuItem.path}
                  className={({ isActive }) =>
                    classNames(
                      "p-[8px_10px] font-extrabold text-[14px] rounded-xl hover:bg-primary transition-all duration-200",
                      {
                        "bg-primary": isActive,
                      },
                    )
                  }
                >
                  {menuItem.name}
                </NavLink>
              ))}
            </nav>
            {breakpoint !== "mobile" ? (
              user ? (
                <Button
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isLoading}
                  component="button"
                  variant="primary"
                >
                  <div className="flex items-center gap-x-2">
                    <BiLogOut className="flex-shrink-0" size={20} />
                    <p>Logout</p>
                  </div>
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setModal("login")}
                  component="button"
                >
                  Customer Login
                </Button>
              )
            ) : (
              <GiHamburgerMenu
                onClick={() => setOpen((prev) => !prev)}
                size={23}
              />
            )}
          </div>
        </div>
        <UserButtons />
      </div>
    </>
  );
}
