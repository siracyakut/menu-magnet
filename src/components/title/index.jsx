import PropTypes from "prop-types";

export default function Title({ children }) {
  return (
    <h2 className="mb-8 font-extrabold text-[48px] leading-[56px]">
      {children}
    </h2>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};
