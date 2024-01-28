import QRCode from "react-qr-code";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function QR({ text, size }) {
  return (
    <Link
      to={text}
      target="_blank"
      style={{
        height: "auto",
        margin: "0 auto",
        maxWidth: size,
        width: "100%",
      }}
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={text}
        viewBox="0 0 256 256"
      />
    </Link>
  );
}

QR.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};
