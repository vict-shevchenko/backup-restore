/**
 * Created by viktor.shevchenko on 5/16/2016.
 */


/*
 * action types
 */

export const INITIAL_BACKUP_DATA_LOADED = 'INITIAL_BACKUP_DATA_LOADED';

// global config options
export const CHANGE_BACKUP_TYPE = 'CHANGE_BACKUP_TYPE';
export const CHANGE_BACKUP_NOTE = 'CHANGE_BACKUP_NOTE';
export const CHANGE_VERIFY_OPT = 'CHANGE_VERIFY_OPT';
export const CHANGE_EXCLUDE_SENSITIVE_DATA_OPT = 'CHANGE_EXCLUDE_SENSITIVE_DATA_OPT';
export const CHANGE_EMAIL_ON_COMPLETE = 'CHANGE_EMAIL_ON_COMPLETE';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const CHANGE_REDUCE_SIZE = 'CHANGE_REDUCE_SIZE';

//ssh

export const CHANGE_SSH_HOST = 'CHANGE_SSH_HOST';
export const CHANGE_SSH_PORT = 'CHANGE_SSH_PORT';
export const CHANGE_SSH_DIRECTORY = 'CHANGE_SSH_DIRECTORY';
export const CHANGE_SSH_USERNAME = 'CHANGE_SSH_USERNAME';
export const CHANGE_SSH_PASSWORD = 'CHANGE_SSH_PASSWORD';

//smb

export const CHANGE_SBM_PATH = 'CHANGE_SBM_PATH';
export const CHANGE_SMB_USERNAME = 'CHANGE_SMB_USERNAME';
export const CHANGE_SMB_PASSWORD = 'CHANGE_SMB_PASSWORD';


/*
 * other constants
 */

export const backupTypes = {
  local: 'On Appliance',
  ssh: 'SSH',
  smb: 'Windows Share',
};

/*
 * action creators
 */

export function handleInitialBackupDataLoaded(data) {
  return { type: INITIAL_BACKUP_DATA_LOADED, value: data }
}

export const generalBackupActionCreators = {
  changeBackupType (event) {
    return { type: CHANGE_BACKUP_TYPE, value: event.target.value }
  },
  changeBackupNote (event) {
    return { type: CHANGE_BACKUP_NOTE, value: event.target.value }
  },
  changeVerifyOption() {
    return { type: CHANGE_VERIFY_OPT };
  },
  changeExcludeSensitiveData () {
    return { type: CHANGE_EXCLUDE_SENSITIVE_DATA_OPT };
  },
  changeEmailOnComplete () {
    return { type: CHANGE_EMAIL_ON_COMPLETE };
  },
  changeEmail (event) {
    return { type: CHANGE_EMAIL, value: event.target.value }
  },
  changeReduceSize () {
    return { type: CHANGE_REDUCE_SIZE };
  }
};

export const sshActionCreators = {
  changeSSHHost (event) {
    return { type: CHANGE_SSH_HOST, value: event.target.value }
  },
  changeSSHPort (event) {
    return { type: CHANGE_SSH_PORT, value: event.target.value }
  },
  changeSSHDirectory (event) {
    return { type: CHANGE_SSH_DIRECTORY, value: event.target.value }
  },
  changeSSHUsername (event) {
    return { type: CHANGE_SSH_USERNAME, value: event.target.value }
  },
  changeSSHPassword (event) {
    return { type: CHANGE_SSH_PASSWORD, value: event.target.value }
  },
  testSSHConnection () {
    
  }
};

export const smbActionCreators = {
  changeSMBPath (event) {
    return { type: CHANGE_SBM_PATH, value: event.target.value }
  },
  changeSMBUsername (event) {
    return { type: CHANGE_SMB_USERNAME, value: event.target.value }
  },
  changeSMBPassword (event) {
    return { type: CHANGE_SMB_PASSWORD, value: event.target.value }
  },
  testSMBConnection () {

  }
};