import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import HelloWorld from './components/hello-world';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [number, setNumber] = useState(2);

  return (
    <div style={{ textAlign: 'center' }}>
      <HelloWorld number={number} title="Hello from React webpack" />
      <button type="button" onClick={() => setNumber(number + 1)}>
        Click me
      </button>
    </div>
  );
}

export default hot(Example);
