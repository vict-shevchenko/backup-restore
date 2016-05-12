/**
 * Created by viktor.shevchenko on 4/29/2016.
 */

const defaultState = {
  isLoading: true,
  backupConfig: {
    types: [],
    selectedType: '',
    notes: '',
    verify: false,
    exclude_sensitive_data: false,
    email_on_complete: false,
    email_to: '',
    reduce_size: false
  }
};
  
const mainReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {};
    case 'TOGGLE_TODO':
      return {};
    case 'SERVER_DATA_FETCHED':
      return Object.assign({},
        state,
        {isLoading: false},
        action.backup_data,
        {sensitive_data: ['Vault', 'Key and Certificate']},
      );
    default:
      return state;
  }
};

export default mainReducer;