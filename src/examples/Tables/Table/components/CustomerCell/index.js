// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDAvatar from "components/MDAvatar";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";

function CustomerCell({ image, name, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftBox mr={1}>
        <MDAvatar bgColor={color} src={image} alt={name} size="xs" />
      </SoftBox>
      <SoftTypography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {name}
      </SoftTypography>
    </SoftBox>
  );
}

// Setting default value for the props of CustomerCell
CustomerCell.defaultProps = {
  image: "",
  color: "dark",
};

// Typechecking props for the CustomerCell
CustomerCell.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
};

export default CustomerCell;
