import PropTypes from "prop-types";

export default function Or({ label }) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex-1 h-0.5 bg-primary/50 rounded" />
      <p className="text-white text-center italic text-sm font-extrabold">
        {label}
      </p>
      <div className="flex-1 h-0.5 bg-primary/50 rounded" />
    </div>
  );
}

Or.propTypes = {
  label: PropTypes.string.isRequired,
};
