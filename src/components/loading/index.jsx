import PropTypes from "prop-types";
import classNames from "classnames";

export default function Loading({ inline }) {
  return (
    <div
      className={classNames("w-full flex items-center justify-center", {
        "h-full": inline,
        "h-screen": !inline,
      })}
    >
      <div className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-primary" />
    </div>
  );
}

Loading.propTypes = {
  inline: PropTypes.bool.isRequired,
};
