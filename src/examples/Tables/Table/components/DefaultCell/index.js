// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import SoftTypography from "components/SoftTypography";

function DefaultCell({ value, suffix }) {
  return (
    <SoftTypography variant="caption" fontWeight="medium" color="text">
      {value}
      {suffix && (
        <SoftTypography variant="caption" fontWeight="medium" color="secondary">
          &nbsp;&nbsp;{suffix}
        </SoftTypography>
      )}
    </SoftTypography>
  );
}

// Setting default values for the props of DefaultCell
DefaultCell.defaultProps = {
  suffix: "",
};

// Typechecking props for the DefaultCell
DefaultCell.propTypes = {
  value: PropTypes.string.isRequired,
  suffix: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default DefaultCell;
