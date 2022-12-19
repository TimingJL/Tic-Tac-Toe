import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import TicTacToe from './TicTacToe';
import themes from './themes';

const defaultTheme = Object.keys(themes)[0];

const App = () => {
  const [selectedTheme] = useState(defaultTheme);

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
      <TicTacToe />
    </ThemeProvider>
  );
};

export default App;
