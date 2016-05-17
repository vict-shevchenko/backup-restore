import React from 'react';
import {Tabs, Pane} from './Tabs.jsx';
import './App.css';
import './BackupAndRestore.css'
import {CreateBackupContainer, RestoreBackup, NoticeBackupContainer} from './BackupAndRestore.jsx';

export default function App(props) {
  return (
    /*  <div className="page">
     <div className="page__container">
     <header className="page__header">
     <nav className="page__nav">
     <div className="page__nav-item">Explore</div>
     <div className="page__nav-item">Model</div>
     <div className="page__nav-item">Manage</div>
     </nav>
     </header>*/
    <div className="page__body">
      <div className="page__title">
        <span className="page__title-text_main">Appliance Backup</span>
      </div>
      <div className="page__content">
        <Tabs selected={0} fullWidth={false} notice={<NoticeBackupContainer/>}>
          <Pane label="Create Backup" url="ui/SetupBackupCreate">
            <CreateBackupContainer/>
          </Pane>
          <Pane label="Restore Backup" url="ui/SetupBackupRestore">
            <RestoreBackup/>
          </Pane>
        </Tabs>
      </div>
    </div>
    /*<div className="page__empty"></div>
     </div>
     <footer className="page__footer">
     Copyright © 2003 - 2016, <a href="">BMC Software</a> (<a href="">Full Copyright Information</a>)<br/>
     BMC Discovery (DEVELOPMENT) Version: 0.0 Release: 0
     </footer>
     </div>*/
  );
}
