/**
 * Created by viktor.shevchenko on 4/29/2016.
 */

import React from 'react';

function BackupDetailsList(props) {
  return (
    <div>
      <h2>{this.props.label}</h2>
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
      <div>
        <h2>Backup Will Contain:</h2>
        <ul>
          {this.props.backup_data.contains.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>
      <div>
        <h2>Not Present:</h2>
        <ul>
          {this.props.backup_data.not_present.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>
      {excludedList}
      <div>
        <h2>Backup Will Contain:</h2>
        <ul>
          this.props.backup_config.reduce_size ?
        </ul>
      </div>
    </div>
  )
}

function BacupConfigurationPreseneter(props) {

}

class BackupDetails extends React.Component {

}

class BackupConfiguration extends React.Component {

}

const CreateBackup = function () {
  return (
    <div>
      <BackupDetails />
      <BackupConfiguration />
    </div>
  )
};


const RestoreBackup = function () {
  return (
    <div>restore backup</div>
  )
};

const NoticeBackup = function () {
  return (
    <span>last back up - <a href="#">yesterday</a></span>
  )
};

export {CreateBackup, RestoreBackup, NoticeBackup};