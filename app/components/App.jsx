import React from 'react';
import Tabs from './Tabs.jsx';
import './App.css';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page">
        <header className="page__header">
          <nav className="page__nav">
            <div className="page__nav-item">Explore</div>
            <div className="page__nav-item">Model</div>
            <div className="page__nav-item">Manage</div>
          </nav>
        </header>
        <div className="page__container">
          <div className="page__title">
            <span className="page__title-text_main">Manage Credentials</span>
            <span className="page__title-text_sub">43 credentials</span>
          </div>
          <div className="page__content">
              <Tabs />
          </div>
        </div>
        <footer className="page__footer">
            Copyright © 2003 - 2016, <a href="">BMC Software</a> (<a href="">Full Copyright Information</a>)<br/>
            BMC Discovery (DEVELOPMENT) Version: 0.0 Release: 0
        </footer>
      </div>
    );
  }
}
