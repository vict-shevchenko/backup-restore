import React from 'react';
import { Tabs, Pane } from './Tabs.jsx';
import './App.css';
import CredentialsList from './CredentialsList';

export default function App (props) {
    const panes = ['device', 'db', 'win', 'test'];

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
                    <Tabs selected={~panes.indexOf(props.params.type) ? panes.indexOf(props.params.type) : 0 }>
                        <Pane label="Devices" url="device">
                            <CredentialsList
                                type="device"
                                canAdd={true} />
                        </Pane>
                        <Pane label="Databases" url="db">
                            <CredentialsList
                                type="db"
                                canAdd={false} />
                        </Pane>
                        <Pane label="Windows Proxies" url="win"><span>Pane 3</span></Pane>
                        <Pane label="Tests" url="test"><span>Pane 4</span></Pane>
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
