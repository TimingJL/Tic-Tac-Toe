/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Chess from '../components/Chess';

const InformationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  border-radius: 12px;
  background: #FFFFFF;
  .information__chess {
    width: 48px;
  }
  & > *:not(:first-child) {
    margin-left: 20px;
  }
`;

const Text = styled.div`
  font-family: 'Noto Sans TC', sans-serif;
  font-weight: 700;
  font-size: 32px;
  white-space: nowrap;
`;


const Information = ({ currentPlayerId, winnerId, isGameEndedInTie }) => {

  const makeContent = () => {
    const hasWinner = winnerId !== 0;
    if (isGameEndedInTie) {
      return <Text>和局</Text>;
    }
    if (!hasWinner) {
      return (
        <>
          <Text>輪到：</Text>
          <Chess playerId={currentPlayerId} className="information__chess" />
        </>
      );
    }
    return (
      <>
        <Chess playerId={winnerId} className="information__chess" />
        <Text>贏得這一局！</Text>
      </>
    );
  };

  return (
    <InformationContainer>
      {makeContent()}
    </InformationContainer>
  );
};

Information.propTypes = {
  currentPlayerId: PropTypes.number,
  winnerId: PropTypes.number,
  isGameEndedInTie: PropTypes.bool
};

export default Information;
