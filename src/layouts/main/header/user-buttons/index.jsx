import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { FaHome } from "react-icons/fa";
import { useAuth } from "~/store/auth/hooks";
import { MdRestaurantMenu } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

export default function UserButtons() {
  const user = useAuth();

  return (
    user && (
      <div className="w-full grid gap-4 md:flex md:items-center">
        <NavLink
          className={({ isActive }) =>
            classNames(
              "flex items-center justify-center gap-x-2 p-[9px_20px] border border-secondary font-bold text-[16px] rounded-[15px] bg-secondary shadow-primaryShadow hover:text-primary hover:border hover:border-primary transition-all",
              {
                "text-primary border border-primary": isActive,
              },
            )
          }
          to="/"
        >
          <FaHome size={18} />
          <p>My Business</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames(
              "flex items-center justify-center gap-x-2 p-[9px_20px] border border-secondary font-bold text-[16px] rounded-[15px] bg-secondary shadow-primaryShadow hover:text-primary hover:border hover:border-primary transition-all",
              {
                "text-primary border border-primary": isActive,
              },
            )
          }
          to="/business/categories"
        >
          <BiSolidCategory size={18} />
          <p>Manage Categories</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            classNames(
              "flex items-center justify-center gap-x-2 p-[9px_20px] border border-secondary font-bold text-[16px] rounded-[15px] bg-secondary shadow-primaryShadow hover:text-primary hover:border hover:border-primary transition-all",
              {
                "text-primary border border-primary": isActive,
              },
            )
          }
          to="/business/menus"
        >
          <MdRestaurantMenu size={18} />
          <p>Manage Menus</p>
        </NavLink>
      </div>
    )
  );
}
