/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Information from './components/Information';
import Squares from './components/Squares';
import RestartButton from './components/RestartButton';
import SwitchMode from './components/SwitchMode';

const TicTacToeGame = styled.div`
  /* 將置中容器放置於背景的正中間 */
  display: flex;
  justify-content: center;
  background: ${(props) => props.theme.background};
  padding: 20px;
  min-height: 100vh;
  box-sizing: border-box;

  .container {
    /* 讓置中容器中的元件垂直排列 */
    display: flex;
    flex-direction: column;
    & > *:not(:first-of-type) {
      margin-top: 20px; // 給元件之間一點間距
    }
  }
  .actions {
    & > *:not(:first-of-type) {
      margin-top: 20px; // 給元件之間一點間距
    }
  }
`;

const PLAYERS = [1, -1];
const WINNER_STEPS_LIST = [
  // 橫向
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // 縱向
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // 右斜
  [2, 4, 6],

  // 左斜
  [0, 4, 8]
];
const defaultUsersSteps = {
  [1]: [],
  [-1]: []
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const selectBlockId = ({ lastStepsToWin, getIsBlockEnable }) => {
  const attachList = lastStepsToWin[-1] || [];
  const protectList = lastStepsToWin[1] || [];
  const stepsToAttach = attachList.filter((blockId) => getIsBlockEnable(blockId));
  const stepsToProtect = protectList.filter((blockId) => getIsBlockEnable(blockId));
  if (stepsToAttach.length > 0) {
    return stepsToAttach[0];
  }
  if (stepsToProtect.length > 0) {
    return stepsToProtect[0];
  }
  let blockId = 4;
  while (!getIsBlockEnable(blockId)) {
    blockId = getRandomInt(9);
  }
  return blockId;
};

const getJudgment = (playersStepsMap) => {
  const playerIds = Object.keys(playersStepsMap).map((playerId) => Number(playerId));
  let winnerId = 0;
  let winnerStepsList = [];
  let lastStepsToWin = {...defaultUsersSteps};
  playerIds.forEach((playerId) => {
    const userSteps = playersStepsMap[playerId];
    const remainingStepsList = WINNER_STEPS_LIST.map((steps) => (
      steps.filter((step) => userSteps.indexOf(step) === -1) // 轉換成「還差哪幾步才能夠獲勝」
    ));
    const foundWinner = remainingStepsList.filter((steps, index) => {
      if (steps.length === 1) {
        lastStepsToWin[playerId] = [
          ...lastStepsToWin[playerId],
          ...steps
        ];
      }
      if (steps.length === 0) { // 找到完全符合勝利條件的組合
        winnerStepsList = [
          ...winnerStepsList,
          WINNER_STEPS_LIST[index]
        ];
        return true;
      }
      return false;
    }).length > 0;
    if (foundWinner) {
      winnerId = playerId;
    }
  });
  return {
    winnerId,
    winnerStepsList,
    lastStepsToWin
  };
};

const TicTacToe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState(PLAYERS[0]);
  const [playersStepsMap, setPlayersStepsMap] = useState(defaultUsersSteps);
  const [isSinglePlay, setIsSinglePlay] = useState(false);
  const [judgmentInfo, setJudgmentInfo] = useState({
    winnerId: 0,
    winnerStepsList: [],
    lastStepsToWin: {}
  });
  const {
    winnerId,
    winnerStepsList,
    lastStepsToWin
  } = judgmentInfo;
  const hasWinner = winnerId !== 0;
  const isGameEndedInTie = PLAYERS.flatMap((playerId) => playersStepsMap[playerId]).length === 9 && !hasWinner;
  const winnerSteps = winnerStepsList.flatMap((steps) => steps);

  const getIsBlockEnable = (blockId) => {
    const allDisabledBlockIds = PLAYERS.flatMap((playerId) => playersStepsMap[playerId]);
    const isBlockEnable = allDisabledBlockIds.indexOf(blockId) === -1;
    return isBlockEnable;
  };

  const handleSwitchPlayMode = () => {
    setIsSinglePlay((prev) => !prev);
  };

  const handleResetAllState = () => {
    setCurrentPlayerId(PLAYERS[0]);
    setPlayersStepsMap(defaultUsersSteps);
    setJudgmentInfo({
      winnerId: 0,
      winnerStepsList: [],
      lastStepsToWin: {}
    });
  };

  const handleClickSquare = (squareId) => {
    if (isLoading) {
      return;
    }
    const isSquareEnable = getIsBlockEnable(squareId);
    if (isSquareEnable && !hasWinner) {
      const nextPlayersStepsMap = {
        ...playersStepsMap,
        [currentPlayerId]: [...playersStepsMap[currentPlayerId], squareId]
      };
      setPlayersStepsMap(nextPlayersStepsMap);
      setJudgmentInfo(getJudgment(nextPlayersStepsMap));
      setCurrentPlayerId((prev) => -1 * prev);
    }
  };

  useEffect(() => {
    if (isSinglePlay && currentPlayerId === -1 && !isGameEndedInTie) {
      setIsLoading(true);
      const blockId = selectBlockId({
        lastStepsToWin,
        getIsBlockEnable
      });
      setTimeout(() => {
        setIsLoading(false);
        handleClickSquare(blockId);
      }, 1000);
    }
  }, [currentPlayerId, isSinglePlay]);

  return (
    <TicTacToeGame className="background">
      <div className="container">
        <Information
          currentPlayerId={currentPlayerId}
          winnerId={winnerId}
          isGameEndedInTie={isGameEndedInTie}
        />
        <Squares
          playersStepsMap={playersStepsMap}
          winnerSteps={winnerSteps}
          handleClickSquare={handleClickSquare}
        />
        <div className="actions">
          <RestartButton
            onClick={handleResetAllState}
          />
          <SwitchMode
            label="電腦對弈模式"
            isActive={isSinglePlay}
            onClick={handleSwitchPlayMode}
          />
        </div>
      </div>
    </TicTacToeGame>
  );
};

export default TicTacToe;
