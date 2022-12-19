import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import Chess from '../Chess';

const worship = keyframes`
  0% {
    transform: scaleY(1);
  }
  40% {
    transform: scaleY(0.9) translateY(12px);
  }
  50% {
    transform: scaleY(1);
  }
  60% {
    transform: scaleY(1.1) translateY(-20px);
  }
  62% {
    transform: scaleY(1) translateY(-20px);
  }
  64% {
    transform: scaleY(0.9) translateY(-20px);
  }
  66% {
    transform: scaleY(1) translateY(-20px);
  }
  68% {
    transform: scaleY(1.1) translateY(-20px);
  }
  100% {
    transform: scaleY(1) translateY(0px);
  }
`;

const winnerStyle = css`
  background: ${(props) => props.theme.block.active};
  & > * {
    animation: ${worship} 1s ease-in-out infinite;
  }
`;

const StyledSquare = styled.div`
  cursor: pointer;
  background: ${(props) => props.theme.block.normal};
  border-radius: 12px;
  box-shadow: inset -4px -4px 12px 0px rgb(0 0 0 / 20%);
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${(props) => props.theme.block.hover};
  }
  &:active {
    background: ${(props) => props.theme.block.active};
  }
  .square__chess-wrapper {
    width: 60%;
    fill: ${(props) => props.theme.chess};
  }
  ${({ $isWinnerStep }) => $isWinnerStep && winnerStyle}
`;

const Square = ({ isWinnerStep, playerId, onClick }) => (
  <StyledSquare onClick={onClick} $isWinnerStep={isWinnerStep}>
    <span className="square__chess-wrapper">
      <Chess playerId={playerId} className="squares__chess" />
    </span>
  </StyledSquare>
);

Square.propTypes = {
  isWinnerStep: PropTypes.bool,
  playerId: PropTypes.number,
  onClick: PropTypes.func
};

export default Square;
