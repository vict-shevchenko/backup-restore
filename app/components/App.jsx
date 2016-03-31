import React from 'react';
import { Tabs, Pane } from './Tabs.jsx';
import './App.css';
import CredentialsList from './CredentialsList';
import deviceCredentials from './../mocks/device-credentials.js';


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device: {
                list: deviceCredentials.map(item => Object.assign({}, item)),
                canAdd: true
            },
            db: {
                list: deviceCredentials.splice(2, 6).map(item => Object.assign({}, item)).reverse(),
                canAdd: false
            }
        };

        this.checkAll = this.checkAll.bind(this);
        this.checkItem = this.checkItem.bind(this);
    }

    checkAll (checked, type) {

        const stateUpd = {};
        Object.defineProperty(stateUpd, type, {value: {}});
        Object.assign(stateUpd[type], this.state[type]);

        stateUpd[type].list = this.state[type].list.map(item => {
            item.checked = checked;
            return item;
        });

        this.setState(stateUpd);
    }

    checkItem (idx, type) {
        const stateUpd = {};
        Object.defineProperty(stateUpd, type, {value: {}});
        Object.assign(stateUpd[type], this.state[type]);

        stateUpd[type].list[idx].checked = !stateUpd[type].list[idx].checked;

        this.setState(stateUpd);
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
                        <Pane label="Devices"><CredentialsList
                            type="device"
                            credentials={this.state.device}
                            checkAll = {this.checkAll}
                            checkItem = {this.checkItem} />
                        </Pane>
                        <Pane label="Databases"><CredentialsList
                            type="db"
                            credentials={this.state.db}
                            checkAll = {this.checkAll}
                            checkItem = {this.checkItem} />
                        </Pane>
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
