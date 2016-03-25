import React from 'react';
import DevicesList from './DevicesList';
import './App.css';

class DBList extends DevicesList {
    constructor(props) {
        super(props);
    }
}

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
            //tabs should go here
            <DevicesList/>
              //db
              <DBList/>
          </div>
        </div>
        <footer className="page__footer">
          footer
        </footer>
      </div>
    );
  }
}
