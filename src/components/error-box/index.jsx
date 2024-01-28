import PropTypes from "prop-types";
import { MdError } from "react-icons/md";

export default function ErrorBox({ children }) {
  return (
    <p className="w-max mx-auto px-4 py-2 flex items-center gap-x-2 bg-red-200 text-red-700 rounded-md">
      <MdError className="text-red-900" size={24} />
      {children}
    </p>
  );
}

ErrorBox.propTypes = {
  children: PropTypes.node.isRequired,
};
