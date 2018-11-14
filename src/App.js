import React, { Component } from 'react';
import StravaAuth from './StravaAuth';
import './App.css';


// TODO: convert to function, read and parse url query from strava
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <StravaAuth />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
