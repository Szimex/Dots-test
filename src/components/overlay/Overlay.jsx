import React, { useState } from 'react';
import style from './overlay.css';
import state from '../../states.jsx';

function Overlay(props) {
  const headline = {
    welcome: '',
  };

  const paragraph = {
    welcome: [
      'This is the second test for this study. Please read the instructions carefully as you progress through the test. ',
      'The test has two parts, Part A and Part B and will take about 5 minutes to complete both parts.',
      'When you have read the instructions you will have the opportunity to complete the sample test before completing the main test.',
    ],
  };

  return (
    <div className="overlay">
      <p>{props.stage}</p>
      <h1 className="overlay_h1">{props.overlay_h1}</h1>
      {paragraph[state[props.stage]].map(p => (
        <p className="overlay_p">{p}</p>
      ))}
      <button onClick={() => props.setStage(1)} className="overlay_button">
        jhi
      </button>
    </div>
  );
}

export default Overlay;
