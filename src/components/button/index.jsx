import { createElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

export default function Button({
  component,
  variant,
  selected,
  children,
  ...props
}) {
  return createElement(
    component,
    {
      className: classNames(
        "flex items-center justify-center p-[9px_16px] font-extrabold text-[14px] leading-[17px] rounded-xl transition-all duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-primary hover:bg-stableLight hover:text-primary":
            variant === "primary",
          "bg-secondary hover:bg-stableLight hover:text-primary":
            variant === "secondary",
          "bg-zinc-600 hover:bg-zinc-500": variant === "light",
          "ring-4 ring-blue-500": selected,
        },
      ),
      ...props,
    },
    children,
  );
}

Button.propTypes = {
  component: PropTypes.oneOf(["button", "a", "div", Link]).isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "light"]).isRequired,
  selected: PropTypes.bool,
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
};
