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
export const START_BACKUP = 'START_BACKUP';

//ssh

export const CHANGE_SSH_HOST = 'CHANGE_SSH_HOST';
export const CHANGE_SSH_PORT = 'CHANGE_SSH_PORT';
export const CHANGE_SSH_DIRECTORY = 'CHANGE_SSH_DIRECTORY';
export const CHANGE_SSH_USERNAME = 'CHANGE_SSH_USERNAME';
export const CHANGE_SSH_PASSWORD = 'CHANGE_SSH_PASSWORD';
export const TEST_SSH_CONNECTION = 'TEST_SSH_CONNECTION';
export const TEST_SSH_CONNECTION_OK = 'TEST_SSH_CONNECTION_OK';
export const TEST_SSH_CONNECTION_ERROR = 'TEST_SSH_CONNECTION_ERROR';
export const TEST_SSH_CONNECTION_CLEAN = 'TEST_SSH_CONNECTION_CLEAN';

//smb

export const CHANGE_SBM_PATH = 'CHANGE_SBM_PATH';
export const CHANGE_SMB_USERNAME = 'CHANGE_SMB_USERNAME';
export const CHANGE_SMB_PASSWORD = 'CHANGE_SMB_PASSWORD';
export const TEST_SMB_CONNECTION = 'TEST_SMB_CONNECTION';
export const TEST_SMB_CONNECTION_OK = 'TEST_SMB_CONNECTION_OK';
export const TEST_SMB_CONNECTION_ERROR = 'TEST_SMB_CONNECTION_ERROR';
export const TEST_SMB_CONNECTION_CLEAN = 'TEST_SMB_CONNECTION_CLEAN';
  


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
  },
  startBackup () {
    return (dispatch, getState) => {
      const state = getState(),
        {selectedType} = state.backupSetup,
        {stand_alone, local_backup_exists} = state.backupData;

      var msg = 'Are you sure you want to start creating a backup? ';

      if (stand_alone) {
        msg += 'This will shut down all services and may take some time.';
      } else {
        msg += `This will shut down all services on all members of the
          cluster and may take some time.`;
      }

      if (selectedType === 'local' && local_backup_exists) {
          msg += ' This will overwrite the existing' + (stand_alone ? 'on-appliance' : 'on-member' ) + '  backup.';
      }

      if (confirm(msg)) {
        dispatch({type: START_BACKUP});
      }
    }
  }
};

export const sshActionCreators = {
  changeSSHHost (event) {
    return (dispatch) => {
      dispatch({ type: CHANGE_SSH_HOST, value: event.target.value });
      dispatch({ type: TEST_SSH_CONNECTION_CLEAN });
    }
  },
  changeSSHPort (event) {
    return (dispatch) => {
      dispatch({ type: CHANGE_SSH_PORT, value: event.target.value });
      dispatch({ type: TEST_SSH_CONNECTION_CLEAN });
    }
  },
  changeSSHDirectory (event) {
    return (dispatch) => {
      dispatch({ type: CHANGE_SSH_DIRECTORY, value: event.target.value });
      dispatch({ type: TEST_SSH_CONNECTION_CLEAN });
    }
  },
  changeSSHUsername (event) {
    return (dispatch) => {
      dispatch({ type: CHANGE_SSH_USERNAME, value: event.target.value });
      dispatch({ type: TEST_SSH_CONNECTION_CLEAN });
    }
  },
  changeSSHPassword (event) {
    return (dispatch) => {
      dispatch({ type: CHANGE_SSH_PASSWORD, value: event.target.value });
      dispatch({ type: TEST_SSH_CONNECTION_CLEAN });
    }
  },
  testSSHConnection () {
    return (dispatch, getState) => {
      const state = getState(),
        {selectedType} = state.backupSetup,
        {nonce_token} = state.backupData,
        {host, port, directory} = state.sshOptions,
        {username, password} = state.sshOptions.credentials;

      dispatch({type: TEST_SSH_CONNECTION});

      fetch(`/ui/SetupBackupCreate?action=test_remote_details&backup_type=${selectedType}&backup_dir=${directory}&backup_host=${host}
        &backup_port=${port}&backup_username=${username}&backup_password=${password}&reqhash=${nonce_token}`, {
        credentials: 'same-origin'
      })
        .then(response => response.json())
        .then(json => dispatch(json.error ? {type: TEST_SSH_CONNECTION_ERROR, errorMsg: json.error} : {type: TEST_SSH_CONNECTION_OK}))
        .catch(ex => dispatch({type: TEST_SSH_CONNECTION_ERROR, errorMsg:ex}))
    }
  }
};

export const smbActionCreators = {
  changeSMBPath (event) {
    return (dispatch) => {
      dispatch({ type: CHANGE_SBM_PATH, value: event.target.value });
      dispatch({ type: TEST_SMB_CONNECTION_CLEAN });
    }
  },
  changeSMBUsername (event) {
    return (dispatch) => {
      dispatch({ type: CHANGE_SMB_USERNAME, value: event.target.value });
      dispatch({ type: TEST_SMB_CONNECTION_CLEAN });
    }
  },
  changeSMBPassword (event) {
    return (dispatch) => {
      dispatch({ type: CHANGE_SMB_PASSWORD, value: event.target.value });
      dispatch({ type: TEST_SMB_CONNECTION_CLEAN });
    }
  },
  testSMBConnection () {
    return (dispatch, getState) => {
      const state = getState(),
        {type} = state.backupSetup,
        {nonce_token} = state.backupData,
        {path} = state.smbOptions,
        {username, password} = state.smbOptions.credentials;

      dispatch({type: TEST_SMB_CONNECTION});

      return fetch(`/ui/SetupBackupCreate?action=test_remote_details&backup_type=${type}
        &backup_path=${path}&backup_username=${username}&backup_password=${password}&reqhash=${nonce_token}`, {
        credentials: 'same-origin'
      })
        .then(response => response.json())
        .then(json => dispatch(json.error ? {type: TEST_SMB_CONNECTION_OK} : {type: TEST_SMB_CONNECTION_ERROR, errorMsg: json.error}))
    }
  }
};