/**
 * Create by lwcai
 * Description: index
 * Date: 2023-02-23
 */
import React from 'react'
import logo from './logo.svg';
import './index.less'


const Main = () => {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
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
  )
}

export default Main
