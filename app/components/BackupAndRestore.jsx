/**
 * Created by viktor.shevchenko on 4/29/2016.
 */

import React, { PropTypes } from 'react';
import {connect} from 'react-redux';

function BackupDetailsList(props) {
  return (
    <div>
      <h2>{this.props.label}:</h2>
      <ul>
        {this.props.list.map((item, idx) => <li key={idx}>{item}</li>)}
      </ul>
    </div>
  )
}

function BackupDetailsPresenter(props) {
  let excludedList = '';

  if (this.props.backup_config.exclude_sensitive_data) {
    excludedList = <BackupDetailsList label="Backup Will Not Contain" list={this.props.backup_data.excluded}/>;
  }

  return (
    <div>
      <BackupDetailsList label="Backup Will Contain" list={this.props.backup_data.include}/>
      <BackupDetailsList label="Not Present" list={this.props.backup_data.not_present}/>
      {excludedList}
      <div>
        <h2>Backup Size:</h2>
        <ul>
          {this.props.backup_config.reduce_size ? this.props.backup_data.backup_size_reduced : this.props.backup_data.backup_size}
        </ul>
      </div>
    </div>
  )
}

function BacupConfigurationPreseneter(props) {

}

const BackupDetails = connect((state) => {
  return {
    backup_config: state.backup_config,
    backup_data: state.backup_data
  }
})(BackupDetailsPresenter);

class BackupConfiguration extends React.Component {

}

class CreateBackup extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    let {dispatch} = this.props;

    fetch('/ui/i/Backup/Details ')
      .then(response => response.text())
      .then(text => text.replace(/while\(1\);/, ''))
      .then(text => JSON.parse(text))
      .then(json => { dispatch(Object.assign({}, { type: 'SERVER_DATA_FETCHED', backup_data: json })) });
  }

  render() {
    return (
      <div>Create backup</div>
    )
  }
}

CreateBackup.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const CreateBackupContainer = connect()(CreateBackup);


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