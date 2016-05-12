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

function BacupConfigurationPreseneter(props) {
  let local_backup_overwritten_msg = '';

  if (props.local_backup_exists) {
    const backup_place = props.stand_alone ? 'on-appliance' : 'on-member',
      msg = `Previous ${backup_place} backup will be overwritten.`;

    local_backup_overwritten_msg = <span>{msg}</span>;
  }


  return (
    <div>
      <fieldset class="backup_form">
        <legend>Backup Destination:</legend>

          <label>
            Backup Type:
            <select name="backup_type" defaultValue="selected" onchange="tw.backup.ui.typeChanged(this);">
              <option value="local" >On Appliance</option>
              <option value="ssh">SSH</option>
              <option value="smb">Windows Share</option>
            </select>
          </label>

        {local_backup_overwritten_msg}

          <label for="backup_notes">
            Notes:<br/>
            <textarea name="backup_notes" id="backup_notes" cols="42" rows="3"/>
          </label>



          <div id="ssh_options" style="display:none">

            <dt><label for="backup_host">Host:</label>
              <span id="required_backup_host" class="required" style="display:none" title="You must enter a host">*</span>
            </dt>
            <dd><input type="text" name="backup_host" id="backup_host" size="35" onkeyup="tw.backup.ui.valueChanged(this);" onchange="tw.backup.ui.valueChanged(this);" oninput="tw.backup.ui.valueChanged(this);" disabled="true" style="background-color: rgb(227, 227, 227);"/>
              <label for="backup_port">Port:</label>
              <input type="text" name="backup_port" id="backup_port" size="6" onkeyup="tw.backup.ui.valueChanged(this);" onchange="tw.backup.ui.valueChanged(this);" oninput="tw.backup.ui.valueChanged(this);" disabled="true" style="background-color: rgb(227, 227, 227);"/>
                <div id="backup_port_error" class="errorMsg"></div>
            </dd>

            <dt><label for="backup_dir">Directory:</label>
              <span id="required_backup_dir" class="required" style="display:none" title="You must enter a remote directory">*</span>
            </dt>
            <dd><input type="text" name="backup_dir" id="backup_dir" size="50" onkeyup="tw.backup.ui.valueChanged(this);" onchange="tw.backup.ui.valueChanged(this);" oninput="tw.backup.ui.valueChanged(this);" disabled="true" style="background-color: rgb(227, 227, 227);"/>
            </dd>

          </div>

          <div id="smb_options" style="display:none">

            <dt><label for="backup_path">Path:</label>
              <span id="required_backup_path" class="required" style="display:none" title="You must enter a path">*</span>
            </dt>
            <dd><input type="text" name="backup_path" id="backup_path" size="50" onkeyup="tw.backup.ui.valueChanged(this);" onchange="tw.backup.ui.valueChanged(this);" oninput="tw.backup.ui.valueChanged(this);" disabled="true" style="background-color: rgb(227, 227, 227);"/>
            </dd>
          </div>

          <div id="credentials_section" style="display:none">

            <dt><label for="backup_username">Username:</label>
              <span id="required_backup_username" class="required" style="display:none" title="You must enter a username">*</span>
            </dt>
            <dd><input type="text" name="backup_username" id="backup_username" onkeyup="tw.backup.ui.valueChanged(this);" onchange="tw.backup.ui.valueChanged(this);" oninput="tw.backup.ui.valueChanged(this);" disabled="true" style="background-color: rgb(227, 227, 227);"/>
            </dd>

            <dt><label for="backup_password">Password:</label>
              <span id="required_backup_password" class="required" style="display:none" title="You must enter a password">*</span>
            </dt>
            <dd><input type="password" name="backup_password" id="backup_password" onkeyup="tw.backup.ui.valueChanged(this);" onchange="tw.backup.ui.valueChanged(this);" disabled="true" style="background-color: rgb(227, 227, 227);"/>
            </dd>

          </div>

          <div id="create_options" style="">

            <div id="successful_test_connection" style="display:none">
              <img src="/styles/default/images/general/png/normal/ok_16.png" onmouseover="this.src='/styles/default/images/general/png/hot/ok_16_hot.png';" onmouseout="this.src='/styles/default/images/general/png/normal/ok_16.png';" alt=""/>Connection test successful
            </div>

            <h3>Options:</h3>

            <dt><label for="backup_verify">Verify backup:</label></dt>
            <dd><input type="checkbox" name="backup_verify" id="backup_verify" class="backup_checkbox" checked=""/>
            </dd>

            <dt><label for="exclude_sensitive_data">Exclude sensitive data:</label></dt>
            <dd><input type="checkbox" name="exclude_sensitive_data" id="exclude_sensitive_data" class="backup_checkbox" onclick="tw.backup.ui.excludeSensitiveData(this);"/>
            </dd>

            <dt><label for="backup_email">Email when complete:</label></dt>
            <dd><input type="checkbox" name="backup_email" id="backup_email" class="backup_checkbox" onclick="tw.backup.ui.emailChanged(this);"/>
              <label for="backup_email_address">To:</label>
              <input type="text" name="backup_email_address" id="backup_email_address" size="40" disabled="true" style="background-color: rgb(227, 227, 227);"/>
            </dd>

            <dt><label for="backup_reduce_size">Reduce backup size (slower to restore):</label></dt>
            <dd><input type="checkbox" name="backup_reduce_size" id="backup_reduce_size" class="backup_checkbox" onclick="tw.backup.ui.reduceBackupSizeChanged(this);"/>
            </dd>
          </div>

        </fieldset>

      <div id="backup_submit_section">

        <div id="create_backup_action" style="">

          <input value="Shutdown &amp; Backup" type="button" id="start_backup_button" class="primary" onclick="tw.backup.ui.submitBackupCreate();return false;" />
            <p>                                                        <img src="/styles/default/images/general/png/normal/message_board_warning_16.png" onmouseover="this.src='/styles/default/images/general/png/hot/message_board_warning_16_hot.png';" onmouseout="this.src='/styles/default/images/general/png/normal/message_board_warning_16.png';" alt="Warning"/> All services will be shut down to make the backup.</p>
            <p id="local_disk_space_warning">
              <img src="/styles/default/images/general/png/normal/alert_16.png"
                   onmouseover="this.src='/styles/default/images/general/png/hot/alert_16_hot.png';"
                   onmouseout="this.src='/styles/default/images/general/png/normal/alert_16.png';" alt="Invalid field"/> Appliance disk space may be insufficient to accommodate this backup (assuming 50% compression).
            </p>
        </div>

        <div id="test_connection_action" style="display:none">

          <input onclick="tw.backup.ui.testCreateRemoteDetails();return false;" value="Test Connection" type="button" id="test_connection_button" />
            <img src="/styles/default/images/ajax/gif/loader_16.gif" alt="" id="test_connection_spinner" style="display:none" />

        </div>

      </div>

      <div id="backup_remote_details_error" style="display:none">
        <img src="/styles/default/images/general/png/normal/alert_16.png" onmouseover="this.src='/styles/default/images/general/png/hot/alert_16_hot.png';" onmouseout="this.src='/styles/default/images/general/png/normal/alert_16.png';" alt="Invalid field"/>
        <span id="backup_remote_details_errortext"></span>
      </div>

    </div>
  )
}


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
            <BacupConfigurationPreseneter {...this.props} />
          </div>
          <div className="twoPanelSection infoSection floatLeft leftAlign">
            <BackupDetailsPresenter {...this.props} />
          </div>
        </div>
    )
  }
}

CreateBackup.propTypes = {
  backup_contents: PropTypes.arrayOf(React.PropTypes.string),
  empty_contents: PropTypes.arrayOf(React.PropTypes.string),
  sensitive_data: PropTypes.arrayOf(React.PropTypes.string),
  backupConfig: PropTypes.object,
  backup_size: PropTypes.string,
  local_backup_exists: PropTypes.bool,
  stand_alone: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
  onInitialDataLoad: PropTypes.func.isRequired
};

const CreateBackupContainer = connect(
  state => {
    return {
      isLoading: state.isLoading,
      backupConfig: state.backupConfig,
      backup_contents: state.backup_contents,
      empty_contents: state.empty_contents,
      sensitive_data: state.backupConfig.exclude_sensitive_data ? state.sensitive_data : [],
      backup_size:  state.backupConfig.reduce_size ? state.backup_size_reduced :  state.backup_size,
      local_backup_exists: state.local_backup_exists,
      stand_alone: state.stand_alone,
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