/**
 * Created by viktor.shevchenko on 4/29/2016.
 */

const defaultState = {
  isLoading: true,
  backupConfig: {
    types: {
      local: 'On Appliance',
      ssh: 'SSH',
      smb: 'Windows Share',
    },
    selectedType: 'local',
    notes: '',
    verify: false,
    exclude_sensitive_data: false,
    email_on_complete: false,
    email_to: '',
    reduce_size: false
  },
  sshOptions: {
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
  },
  smbOptions: {
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
  }
};
  
const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {};
    case 'TOGGLE_TODO':
      return {};
    case 'SERVER_DATA_FETCHED':
     let newState = Object.assign({},
        state,
        {isLoading: false},
        action.backup_data,
        {sensitive_data: ['Vault', 'Key and Certificate']},
      );
      
      if (!action.backup_data) {
        newState.backupConfig.types.local = 'On Members'
      }
      
      return newState;
    case 'BACKUP_TYPE_CHANGE':
      let st = JSON.stringify(state);
      st = JSON.parse(st);

      st.backupConfig.selectedType = action.value;

      return st;

    default:
      return state;
  }
};

export default mainReducer;