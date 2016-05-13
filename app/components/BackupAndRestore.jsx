/**
 * Created by viktor.shevchenko on 4/29/2016.
 */

import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

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


function BackupCredentials ({credentials}) {

  return (
    <div>
      <label >Username:{credentials.isUserNameRequired ? '*' : ''}</label>
      <input type="text" value={credentials.username}/>


      <label for="backup_password">Password:</label>
      <input type="password" value={credentials.username}/>
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
      <button>Test Connection</button> {testing ? <span>testing... wait...</span> : ''}
      {error ? <span>{error}</span> : ''}
    </div>
  )
}

function SSHBackupOptions(props) {
  const { host, port, directory, connection, credentials } = props.options;

  return (
    <div>

      <label>Host:*</label>
      <input type="text" value={host} />

      <label>Port:</label>
      <input type="text" value={port} />
      <div id="backup_port_error" class="errorMsg"></div>

      <label>Directory:*</label>
      <input type="text" value={directory} />

      <BackupCredentials credentials={credentials} />

      <BackupTestConnection connection={connection}/>

    </div>
  )
}

function SMBBackupOptions(props) {
  const { path, connection, credentials } = props.options;

  return (
    <div>

      <label for="backup_path">Path:*</label>
      <input type="text" value={path}/>

      <BackupCredentials credentials={credentials}/>

      <BackupTestConnection connection={connection}/>

    </div>
  )
}

function GlobalBackupOptions(props) {

  const {selectedType, verify, exclude_sensitive_data, email_on_complete, email_to, reduce_size} = props.backupConfig;

  return (
    <div>
      <h3>Options:</h3>

      <label>Verify backup:
        <input type="checkbox" checked={verify}/>
      </label><br/>

      <label>Exclude sensitive data:
        <input type="checkbox" checked={exclude_sensitive_data} />
      </label><br/>
      
      <label>Email when complete:
        <input type="checkbox" checked={email_on_complete} />
      </label><br/>

      <label >To:
        <input type="text" value={email_to}/>
      </label><br/>

      <label>Reduce backup size (slower to restore):
        <input type="checkbox" checked={reduce_size} />
      </label><br/>

      <button type="button">Shutdown &amp; Backup</button><br/>


      <span alt="Warning"> All services will be shut down to make the backup.</span><br/>

      {selectedType === 'local' && props.warn_local_disk_space ?
        <span> Appliance disk space may be insufficient to accommodate this backup (assuming 50% compression).</span> : ''}
    </div>
  )
}



function BackupDetailsPresenter(props) {
  const {backup_contents, empty_contents, sensitive_data, backup_size} = props;
  let backup_include = [].concat(backup_contents);

  sensitive_data.forEach(value => {
    let idx = backup_contents.indexOf(value);
    backup_include = backup_include.splice(idx, 1);
  });

  return (
    <div>
      <BackupDetailsList label="Backup Will Contain" list={backup_include}/>
      <BackupDetailsList label="Not Present" list={empty_contents}/>
      {sensitive_data.length ? <BackupDetailsList label="Backup Will Not Contain" list={sensitive_data}/> : ''}
      <div>
        <h2>Backup Size:</h2>
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
      return {
        backup_contents: state.backup_contents,
        empty_contents: state.empty_contents,
        sensitive_data: state.backupConfig.exclude_sensitive_data ? state.sensitive_data : [],
        backup_size:  state.backupConfig.reduce_size ? state.backup_size_reduced :  state.backup_size,
      }
    })(BackupDetailsPresenter);


function BackupConfigurationPresenter(props) {
  const { backupConfig, sshOptions, smbOptions, onBackupTypeChange } = props;
  let local_backup_overwritten_msg = '',
    globalBackupOptions = '';

  if (props.local_backup_exists) {
    const backup_place = props.stand_alone ? 'on-appliance' : 'on-member',
      msg = `Previous ${backup_place} backup will be overwritten.`;

    local_backup_overwritten_msg = <span>{msg}</span>;
  }

  if (backupConfig.selectedType === 'local' ||
    (backupConfig.selectedType === 'ssh' && sshOptions.connection.isSuccessful) ||
    (backupConfig.selectedType === 'smb' && smbOptions.connection.isSuccessful)) {
    globalBackupOptions = <GlobalBackupOptions {...props}/>;
  }

  return (
    <div>
      <legend>Backup Destination:</legend>

        <label>
          Backup Type:
          <select value={backupConfig.selectedType} onChange={onBackupTypeChange}>
            {Object.keys(backupConfig.types).map(
              (type_val, idx) => <option value={type_val} key={idx}>{backupConfig.types[type_val]}</option>
            )}
          </select>
        </label>

      {local_backup_overwritten_msg}

        <label>
          Notes:<br/>
          <textarea value={backupConfig.notes} cols="42" rows="3" onchange="tw.backup.ui.typeChanged(this);" />
        </label>

      {backupConfig.selectedType === 'ssh' ? <SSHBackupOptions options={sshOptions} /> : ''}
      {backupConfig.selectedType === 'smb' ? <SMBBackupOptions options={smbOptions} /> : ''}

      {globalBackupOptions}
    </div>
  )
}

BackupConfigurationPresenter.propTypes = {
  backupConfig: PropTypes.shape({
    types: PropTypes.objectOf(React.PropTypes.string),
    selectedType: PropTypes.string,
    notes: PropTypes.string,
    verify: PropTypes.bool,
    exclude_sensitive_data: PropTypes.bool,
    email_on_complete: PropTypes.bool,
    email_to: PropTypes.string,
    reduce_size: PropTypes.bool
  }),
  sshOptions: PropTypes.object,
  smbOptions: PropTypes.object,
  warn_local_disk_space: PropTypes.bool,
  stand_alone: PropTypes.bool,
  local_backup_exists: PropTypes.bool,
  // actions
  onBackupTypeChange: PropTypes.func
};

const BackupConfigurationContainer = connect( state => {

  return {
    backupConfig: state.backupConfig,
    sshOptions: state.sshOptions,
    smbOptions: state.smbOptions,
    warn_local_disk_space: state.warn_local_disk_space,
    stand_alone: state.stand_alone,
    local_backup_exists: state.local_backup_exists,
  }
}, dispatch => {
  return {
    onBackupTypeChange : event => dispatch({type: 'BACKUP_TYPE_CHANGE', value: event.target.value})
  }
})(BackupConfigurationPresenter);


class CreateBackup extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    fetch('/ui/i/Backup/Details ')
      .then(response => response.text())
      .then(text => text.replace(/while\(1\);/, ''))
      .then(text => JSON.parse(text))
      .then(json =>  this.props.onInitialDataLoad(json));
  }

  render() {
    const {isLoading} = this.props;

    if (isLoading) {
      return (<span> loading ....</span>);
    }

    return (
        <div>
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

const CreateBackupContainer = connect(
  state => {
    return {
      isLoading: state.isLoading,
    }
  },
  dispatch => {
    return {
      onInitialDataLoad: function (data) {
          dispatch(Object.assign({}, { type: 'SERVER_DATA_FETCHED', backup_data: data }));
        }
      }
  })(CreateBackup);


const RestoreBackup = function () {
  return (
    <div>restore backup 1</div>
  )
};

const NoticeBackup = function () {
  return (
    <span>last back up - <a href="#">yesterday</a></span>
  )
};

export {CreateBackupContainer, RestoreBackup, NoticeBackup};