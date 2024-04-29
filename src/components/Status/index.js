// StatusIndicator.js
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const StatusButton = ({ status }) => {
    const backgroundColor = status === 0 ? 'green' : 'red';

    return (
      <Button
        variant="contained"
        style={{ color: 'white', backgroundColor }}
      >
        {status === 0 ? 'Active' : 'Deactive'}
      </Button>
    );
};


StatusButton.propTypes = {
    status: PropTypes.number.isRequired,
  };

export default StatusButton;
