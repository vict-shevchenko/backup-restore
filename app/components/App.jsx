import React from 'react';
import { Tabs, Pane } from './Tabs.jsx';
import './App.css';
import DevicesList from './DevicesList';
import deviceCredentials from './../mocks/device-credentials.js';

const list = deviceCredentials.concat([]).splice(2, 6).reverse();

class DBList extends DevicesList {
    constructor(props) {
        super(props);
        this.state = {
            list: list,
            allChecked: false,
            filterItems: []
        };

        this.canAddCredentials = false;
    }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page">
        <div className="page__container">
            <header className="page__header">
                <nav className="page__nav">
                    <div className="page__nav-item">Explore</div>
                    <div className="page__nav-item">Model</div>
                    <div className="page__nav-item">Manage</div>
                </nav>
            </header>
            <div className="page__body">
                <div className="page__title">
                    <span className="page__title-text_main">Manage Credentials</span>
                    <span className="page__title-text_sub">43 credentials</span>
                </div>
                <div className="page__content">
                    <Tabs selected={0}>
                        <Pane label="Devices"><DevicesList /></Pane>
                        <Pane label="Databases"><DBList /></Pane>
                        <Pane label="Windows Proxies"><span>Pane 3</span></Pane>
                        <Pane label="Tests"><span>Pane 4</span></Pane>
                    </Tabs>
                </div>
            </div>
            <div className="page__empty"></div>
        </div>
        <footer className="page__footer">
            Copyright © 2003 - 2016, <a href="">BMC Software</a> (<a href="">Full Copyright Information</a>)<br/>
            BMC Discovery (DEVELOPMENT) Version: 0.0 Release: 0
        </footer>
      </div>
    );
  }
}
