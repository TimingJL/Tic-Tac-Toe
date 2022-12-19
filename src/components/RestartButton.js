import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledRestartButton = styled.div`
  font-family: 'Black Han Sans', sans-serif;
  font-size: 28px;
  background: ${(props) => props.theme.restartButton.normal};
  box-shadow: inset -4px -4px 12px 0px rgb(0 0 0 / 20%);
  &:hover {
    background: ${(props) => props.theme.restartButton.hover};
  }
  &:active {
    background: ${(props) => props.theme.restartButton.active};
  }
  color: ${(props) => props.theme.color};
  border-radius: 50px;
  height: 56px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RestartButton = ({ onClick }) => {
  return (
    <StyledRestartButton onClick={onClick}>
      <span>Restart</span>
    </StyledRestartButton>
  );
};

RestartButton.propTypes = {
  onClick: PropTypes.func
};

export default RestartButton;
