import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.js';

const App = () => {
  return (
    <div>
      <header>
        <h1>Star Wars</h1>
        <p>Characters Catalogue</p>
      </header>
      <Main />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
