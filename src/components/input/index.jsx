import { ErrorMessage, Field } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import classNames from "classnames";

export default function Input({ component = "input", label, name, ...props }) {
  const [visible, setVisible] = useState(false);
  const [animationParent] = useAutoAnimate();

  return (
    <label>
      <p className="font-semibold mb-2.5 text-[16px] leading-[19px]">{label}</p>
      <div className="relative">
        <Field
          component={component}
          autoComplete="off"
          name={name}
          className={classNames(
            "text-white font-bold w-full p-[9px_16px] text-[14px] leading-[17px] outline-none rounded-xl bg-[#282828] placeholder:text-[#898989] placeholder:text-[13px]",
            {
              "h-40": component === "textarea",
            },
          )}
          {...props}
          type={
            props?.type === "password"
              ? visible
                ? "text"
                : "password"
              : props?.type || "text"
          }
        />
        {props?.type === "password" && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setVisible((prev) => !prev)}
          >
            {!visible ? (
              <FaEye className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-3" />
            ) : (
              <FaEyeSlash className="cursor-pointer absolute top-1/2 -translate-y-1/2 right-3" />
            )}
          </button>
        )}
      </div>
      <div className="text-nowrap" ref={animationParent}>
        <ErrorMessage
          name={name}
          component="small"
          className="text-xs mt-1.5 text-primary font-bold"
        />
      </div>
    </label>
  );
}

Input.propTypes = {
  component: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.object,
};
