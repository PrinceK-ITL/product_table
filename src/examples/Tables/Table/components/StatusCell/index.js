// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

function StatusCell({ icon, color, status }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftBox mr={1}>
        <SoftButton variant="outlined" color={color} size="small" iconOnly circular>
          <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
        </SoftButton>
      </SoftBox>
      <SoftTypography variant="caption" fontWeight="medium" color="text" sx={{ lineHeight: 0 }}>
        {status}
      </SoftTypography>
    </SoftBox>
  );
}

// Typechecking props for the StatusCell
StatusCell.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default StatusCell;
