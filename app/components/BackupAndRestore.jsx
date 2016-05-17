/**
 * Created by viktor.shevchenko on 4/29/2016.
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import _without  from 'lodash/without';

import Spinner from './Spinner.jsx'

import { handleInitialBackupDataLoaded,
  generalBackupActionCreators,
  sshActionCreators,
  smbActionCreators } from './../actions';

function BackupDetailsList(props) {
  return (
    <div>
      <h3>{props.label}:</h3>
      <ul>
        {props.list.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  )
}


function BackupCredentials ({credentials, onUsernameChange, onPasswordChange}) {

  return (
    <div>
      <label >Username:{credentials.isUserNameRequired ? '*' : ''}
        <input type="text" value={credentials.username} onChange={onUsernameChange}/>
      </label>
      <br/>

      <label >Password:
        <input type="password" value={credentials.password} onChange={onPasswordChange}/>
      </label>
    </div>
  )
}

function BackupTestConnection(props) {
  const {testing, isSuccessful, error} = props.connection;

  if (isSuccessful) {
    return (<span>Connection test successful</span>)
  }

  return (
    <div>
      <button type="button" disabled={!props.disabled} onClick={props.testConnection}>Test Connection</button> {testing ? <span>testing... wait...</span> : ''}
      <br/>
      {error ? <span>{error}</span> : ''}
    </div>
  )
}
BackupTestConnection.PropTypes = {
  connection: PropTypes.shape({
    testing: PropTypes.bool,
    isSuccessful: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  testConnection: PropTypes.func.isRequired,
};

function SSHBackupOptions(props) {
  const { host, port, directory, connection, credentials } = props.options,
    {changeSSHHost, changeSSHPort, changeSSHDirectory, changeSSHUsername, changeSSHPassword, testSSHConnection } = props.actions;

  return (
    <div>

      <label>Host:*</label>
      <input type="text" value={host} onChange={changeSSHHost} />

      <label>Port:</label>
      <input type="text" value={port}  onChange={changeSSHPort} />
      <div id="backup_port_error" className="errorMsg"></div>

      <label>Directory:*</label>
      <input type="text" value={directory}  onChange={changeSSHDirectory} />

      <BackupCredentials credentials={credentials} onUsernameChange={changeSSHUsername} onPasswordChange={changeSSHPassword} />

      <BackupTestConnection connection={connection}
                            disabled={host && directory && (credentials.isUserNameRequired ? credentials.username : true )}
                            testConnection={testSSHConnection} />

    </div>
  )
}

function SMBBackupOptions(props) {
  const { path, connection, credentials } = props.options,
    {changeSMBPath, changeSMBUsername, changeSMBPassword, testSMBConnection } = props.actions;

  return (
    <div>

      <label>Path:*
        <input type="text" value={path} onChange={changeSMBPath} />
      </label>

      <BackupCredentials credentials={credentials} onUsernameChange={changeSMBUsername} onPasswordChange={changeSMBPassword}/>

      <BackupTestConnection connection={connection}
                            disabled={path && (credentials.isUserNameRequired ? credentials.username : true )}
                            testConnection={testSMBConnection} />

    </div>
  )
}

function GlobalBackupOptions(props) {

  const {selectedType, verify, exclude_sensitive_data, email_on_complete, email_to, reduce_size} = props.backupSetup,
    {warn_local_disk_space_reduced, warn_local_disk_space} = props.backupData,
    {changeVerifyOption, changeExcludeSensitiveData, changeEmailOnComplete, changeEmail, changeReduceSize, startBackup} = props.generalActions;

  let warnDiskSpace = false;

  if(selectedType === 'local' && ((reduce_size && props.warn_local_disk_space_reduced) || props.warn_local_disk_space)) {

  }

  return (
    <div>
      <h3>Options:</h3>

      <label>Verify backup:
        <input type="checkbox" checked={verify} onClick={changeVerifyOption}/>
      </label><br/>

      <label>Exclude sensitive data:
        <input type="checkbox" checked={exclude_sensitive_data} onClick={changeExcludeSensitiveData} />
      </label><br/>
      
      <label>Email when complete:
        <input type="checkbox" checked={email_on_complete} onClick={changeEmailOnComplete}/>
      </label><br/>

      <label >To:
        <input type="text" disabled={!email_on_complete} value={email_to} onChange={changeEmail}/>
      </label><br/>

      <label>Reduce backup size (slower to restore):
        <input type="checkbox" checked={reduce_size} onClick={changeReduceSize}/>
      </label><br/>

      <button type="button" className="btn btn_primary" onClick={startBackup}>Shutdown &amp; Backup</button><br/>

      <span alt="Warning"> All services will be shut down to make the backup.</span><br/>

      {(selectedType === 'local' && ((reduce_size && warn_local_disk_space_reduced) || warn_local_disk_space)) ?
        <span> Appliance disk space may be insufficient to accommodate this backup (assuming 50% compression).</span> : ''}
    </div>
  )
}


function BackupDetailsPresenter({backup_contents, empty_contents, sensitive_data, backup_size}) {

  return (
    <div>
      <BackupDetailsList label="Backup Will Contain" list={backup_contents}/>
      <BackupDetailsList label="Not Present" list={empty_contents}/>
      {sensitive_data.length ? <BackupDetailsList label="Backup Will Not Contain" list={sensitive_data}/> : ''}
      <div>
        <h3>Backup Size:</h3>
        <ul>
          {backup_size}
        </ul>
      </div>
    </div>
  )
}
BackupDetailsPresenter.propTypes = {
  backup_contents: PropTypes.arrayOf(React.PropTypes.string),
  empty_contents: PropTypes.arrayOf(React.PropTypes.string),
  sensitive_data: PropTypes.arrayOf(React.PropTypes.string),
  backup_size: PropTypes.string,
};
const BackupDetailsContainer = connect( state => {
  const {backup_contents, sensitive_data} = state.backupData;
  
  return {
    backup_contents: state.backupSetup.exclude_sensitive_data ? _without(backup_contents, ...sensitive_data) : backup_contents,
    empty_contents: state.backupData.empty_contents,
    sensitive_data: state.backupSetup.exclude_sensitive_data ? sensitive_data : [],
    backup_size:  state.backupSetup.reduce_size ? state.backupData.backup_size_reduced :  state.backupData.backup_size,
  }
})(BackupDetailsPresenter);


function BackupConfigurationPresenter(props) {
  const {local_backup_exists, stand_alone} = props.backupData,
    {types, selectedType, notes, isBackupRunning} = props.backupSetup,
    {changeBackupType, changeBackupNote} = props.generalActions;

  let globalBackupOptions = '';

  if (selectedType === 'local' ||
    (selectedType === 'ssh' && props.sshOptions.connection.isSuccessful) ||
    (selectedType === 'smb' && props.smbOptions.connection.isSuccessful)) {
    globalBackupOptions = <GlobalBackupOptions {...props}/>;
  }

  return (
    <div>
      
      {isBackupRunning ? <Spinner /> : ''}
      
      <h3>Backup Destination:</h3>

      <label>
        Backup Type:
        <select value={selectedType} onChange={changeBackupType}>
          {Object.keys(types).map(
            (type_val, idx) => <option value={type_val} key={idx}>{types[type_val]}</option>
          )}
        </select>
      </label>

      {local_backup_exists ? <span><br/>{'Previous ' + (stand_alone ? 'on-appliance' : 'on-member') + ' backup will be overwritten.'}</span> : '' }

      <br/>
      <label>
        Notes:<br/>
        <textarea className="textarea-notes" value={notes} onChange={changeBackupNote} />
      </label>

      {selectedType === 'ssh' ? <SSHBackupOptions options={props.sshOptions} actions={props.sshActions} /> : ''}
      {selectedType === 'smb' ? <SMBBackupOptions options={props.smbOptions} actions={props.smbActions} /> : ''}

      {globalBackupOptions}
    </div>
  )
}
BackupConfigurationPresenter.propTypes = {
  backupSetup: PropTypes.shape({
    types: PropTypes.objectOf(React.PropTypes.string),
    selectedType: PropTypes.string,
    notes: PropTypes.string,
    verify: PropTypes.bool,
    exclude_sensitive_data: PropTypes.bool,
    email_on_complete: PropTypes.bool,
    email_to: PropTypes.string,
    reduce_size: PropTypes.bool
  }),
  backupData: PropTypes.shape({
    backup_size: PropTypes.string,
    backup_size_reduced: PropTypes.string,
    local_backup_exists: PropTypes.bool,
    stand_alone: PropTypes.bool,
    backup_contents: PropTypes.array,
    empty_contents: PropTypes.array,
    sensitive_data: PropTypes.array,
    warn_local_disk_space: PropTypes.bool,
    warn_local_disk_space_reduced: PropTypes.bool

  }),
  sshOptions: PropTypes.object,
  smbOptions: PropTypes.object,
  // actions
  generalActions: PropTypes.objectOf(PropTypes.func),
  sshActions: PropTypes.objectOf(PropTypes.func),
  smbActions: PropTypes.objectOf(PropTypes.func),
};
const BackupConfigurationContainer = connect( state => {
  return {
    backupSetup: state.backupSetup,
    backupData: state.backupData,
    sshOptions: state.sshOptions,
    smbOptions: state.smbOptions,
  }
},
  dispatch => {
    return {
      generalActions: bindActionCreators(generalBackupActionCreators, dispatch),
      sshActions: bindActionCreators(sshActionCreators, dispatch),
      smbActions: bindActionCreators(smbActionCreators, dispatch),
    }
  }
)(BackupConfigurationPresenter);


class CreateBackup extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    fetch('/ui/i/Backup/Details ', {
      credentials: 'same-origin'
    })
      .then(response => response.text())
      .then(text => text.replace(/while\(1\);/, ''))
      .then(text => JSON.parse(text))
      .then(json =>  this.props.onInitialDataLoad(json));
  }

  render() {
    if (this.props.isLoading) {
      return (<span> loading ....</span>);
    }

    return (
        <div className="clearfix tabContentHolder twoPanelTab">
          <div className="twoPanelSection formSection floatRight leftAlign">
            <BackupConfigurationContainer />
          </div>
          <div className="twoPanelSection infoSection floatLeft leftAlign">
            <BackupDetailsContainer />
          </div>
        </div>
    )
  }
}
CreateBackup.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onInitialDataLoad: PropTypes.func.isRequired
};
const CreateBackupContainer = connect(state => {
    return {
      isLoading: state.isLoading,
    }
  },
  dispatch => {
    return {
      onInitialDataLoad: data => {
        dispatch(handleInitialBackupDataLoaded(data))
      }
    }
  }
)(CreateBackup);


const RestoreBackup = function () {
  return (
    <div>restore backup 1</div>
  )
};

const NoticeBackup = function (props) {
  if (!props.last_backup) {
    return <span>{''}</span>;
  }

  const {duration, start_time, id, success} = props.last_backup;

  return (
    <div>
      <span className="data_label">Last Backup Created:</span>
      <a id="last_backup_event_link" className="anchor_text" href={`SetupAuditRecordView?nodeID=${id}`}>
        {start_time ? start_time : '' }
        {duration ? ` (Duration: ${duration}` : ''}
      </a>
      {success === 'False' ? <span>(Failure)</span> : ''}
      {props.backup_interrupted ? <span class="errorMsg">(Backup was interrupted)</span> : ''}
    </div>
  )
};

const NoticeBackupContainer = connect (state => {
  return {
    last_backup: state.backupData ? state.backupData.last_backup : null,
    backup_interrupted: state.backupData ? state.backupData.backup_interrupted : null,
  }
})(NoticeBackup);

export {CreateBackupContainer, RestoreBackup, NoticeBackupContainer};