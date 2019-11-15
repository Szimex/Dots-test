import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Overlay from './components/overlay/Overlay.jsx';
import Board from './components/board/Board.jsx';

function Test() {
  // if (stage == WELCOME)

  // if (state[stage] == 'welcome')

  // if (stage == 0)

  const [stage, setStage] = React.useState(0);

  return (
    <div>
      <Overlay stage={stage} setStage={setStage} />
      <Board />
    </div>
  );
}

export default hot(Test);
