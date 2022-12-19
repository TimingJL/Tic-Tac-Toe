import React from 'react';
import PropTypes from 'prop-types';
import { CircleIcon } from '../Icons/CircleIcon';
import { CrossIcon } from '../Icons/CrossIcon';

const Chess = ({ playerId, ...props }) => {
  if (playerId === 1) {
    return <CircleIcon {...props} />;
  }
  if (playerId === -1) {
    return <CrossIcon {...props} />;
  }
  return null;
};

Chess.propTypes = {
  playerId: PropTypes.number
};

export default Chess;