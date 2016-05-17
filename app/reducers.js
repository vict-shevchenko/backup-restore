/**
 * Created by viktor.shevchenko on 4/29/2016.
 */

import { combineReducers } from 'redux';

import {
  INITIAL_BACKUP_DATA_LOADED, 
  CHANGE_BACKUP_TYPE,
  CHANGE_BACKUP_NOTE,
  CHANGE_VERIFY_OPT,
  CHANGE_EXCLUDE_SENSITIVE_DATA_OPT,
  CHANGE_EMAIL_ON_COMPLETE,
  CHANGE_EMAIL,
  CHANGE_REDUCE_SIZE,
  START_BACKUP,

  CHANGE_SSH_HOST,
  CHANGE_SSH_PORT,
  CHANGE_SSH_DIRECTORY,
  CHANGE_SSH_USERNAME,
  CHANGE_SSH_PASSWORD,
  TEST_SSH_CONNECTION,
  TEST_SSH_CONNECTION_OK,
  TEST_SSH_CONNECTION_ERROR,
  TEST_SSH_CONNECTION_CLEAN,

  CHANGE_SBM_PATH,
  CHANGE_SMB_USERNAME,
  CHANGE_SMB_PASSWORD,
  TEST_SMB_CONNECTION,
  TEST_SMB_CONNECTION_OK,
  TEST_SMB_CONNECTION_ERROR,
  TEST_SMB_CONNECTION_CLEAN,
backupTypes} from './actions';

const defaultBackupSetup = {
  types: backupTypes,
  selectedType: 'local',
  notes: '',
  verify: false,
  exclude_sensitive_data: false,
  email_on_complete: false,
  email_to: '',
  reduce_size: false,
  isBackupRunning: false
};

const defaultSshOptions = {
    host: '',
    port: '',
    directory: '',
    connection: {
      testing: false,
      isSuccessful: false,
      error: ''
    },
    credentials: {
      isUserNameRequired: true,
      username: '',
      password: ''
    }
  };

const defaultSmbOptions = {
    path: '',
    connection: {
      testing: false,
      isSuccessful: false,
      error: ''
    },
    credentials: {
      isUserNameRequired: false,
      username: '',
      password: ''
    }
  };

const connection = (connection = {
  testing: false,
  isSuccessful: false,
  error: ''
}, action) => {
  switch (action.type) {

    case TEST_SSH_CONNECTION:
      return Object.assign({}, connection, {testing: true});
    case TEST_SSH_CONNECTION_OK:
      return Object.assign({}, connection, {testing: false, isSuccessful: true});
    case TEST_SSH_CONNECTION_ERROR:
      return Object.assign({}, connection, {testing: false, error: action.errorMsg});
    default:
      return connection;
  }
};


const isLoading = (isLoading = true, action ) => {
  switch (action.type) {
    case INITIAL_BACKUP_DATA_LOADED:
      return false;
    default:
      return isLoading
  }
};

const backupSetup = (backupSetup = defaultBackupSetup, action ) => {
  switch (action.type) {
    case CHANGE_BACKUP_TYPE:
      return Object.assign({}, backupSetup, {selectedType: action.value});
    case CHANGE_BACKUP_NOTE:
      return Object.assign({}, backupSetup, {notes: action.value});
    case CHANGE_VERIFY_OPT:
      return Object.assign({}, backupSetup, {verify: !backupSetup.verify});
    case CHANGE_EXCLUDE_SENSITIVE_DATA_OPT:
      return Object.assign({}, backupSetup, {exclude_sensitive_data: !backupSetup.exclude_sensitive_data});
    case CHANGE_EMAIL_ON_COMPLETE:
      return Object.assign({}, backupSetup, {email_on_complete: !backupSetup.email_on_complete});
    case CHANGE_EMAIL:
      return Object.assign({}, backupSetup, {email_to: action.value});
    case CHANGE_REDUCE_SIZE:
      return Object.assign({}, backupSetup, {reduce_size: !backupSetup.reduce_size});
    case START_BACKUP:
      return Object.assign({}, backupSetup, {isBackupRunning: true});
    default:
      return backupSetup;
  }
};

const backupData = (backupData = {}, action ) => {
  switch (action.type) {
    case INITIAL_BACKUP_DATA_LOADED:
      return Object.assign({}, action.value, {sensitive_data: ['Vault', 'Key and Certificate']});
    default:
      return backupData;
  }
};

const sshOptions = (sshOptions = defaultSshOptions, action ) => {
  switch (action.type) {
    case CHANGE_SSH_HOST:
      return Object.assign({}, sshOptions, {host: action.value});
    case CHANGE_SSH_PORT:
      return Object.assign({}, sshOptions, {port: action.value});
    case CHANGE_SSH_DIRECTORY:
      return Object.assign({}, sshOptions, {directory: action.value});
    case CHANGE_SSH_USERNAME:
      const sshUsernameCredentials = Object.assign({}, sshOptions.credentials, {username: action.value} );
      return Object.assign({}, sshOptions, {credentials:sshUsernameCredentials});
    case CHANGE_SSH_PASSWORD:
      const sshPasswordCredentials = Object.assign({}, sshOptions.credentials, {password: action.value} );
      return Object.assign({}, sshOptions, {credentials:sshPasswordCredentials});
    case TEST_SSH_CONNECTION:
    case TEST_SSH_CONNECTION_OK:
    case TEST_SSH_CONNECTION_ERROR:
      return Object.assign({}, sshOptions, {connection: connection(sshOptions.connection, action)});
    case TEST_SSH_CONNECTION_CLEAN:
      return Object.assign({}, sshOptions, {connection: connection(undefined, action)});
    default:
      return sshOptions;
  }
};

const smbOptions = (smbOptions = defaultSmbOptions, action ) => {
  switch (action.type) {
    case CHANGE_SBM_PATH:
      return Object.assign({}, smbOptions, {path: action.value});
    case CHANGE_SMB_USERNAME:
      const smbUsernameCredentials = Object.assign({}, smbOptions.credentials, {username: action.value} );
      return Object.assign({}, smbOptions, { credentials: smbUsernameCredentials });
    case CHANGE_SMB_PASSWORD:
      const smbPasswordCredentials = Object.assign({}, smbOptions.credentials, {password: action.value} );
      return Object.assign({}, smbOptions, { credentials: smbPasswordCredentials } );
    case TEST_SMB_CONNECTION:
    case TEST_SMB_CONNECTION_OK:
    case TEST_SMB_CONNECTION_ERROR:
      return Object.assign({}, smbOptions, {connection: connection(smbOptions.connection, action)});
    case TEST_SMB_CONNECTION_CLEAN:
      return Object.assign({}, smbOptions, {connection: connection(undefined, action)});
    default:
      return smbOptions;
  }
};


const mainReducer = combineReducers({
  isLoading,
  backupSetup,
  backupData,
  sshOptions,
  smbOptions
});


export default mainReducer;