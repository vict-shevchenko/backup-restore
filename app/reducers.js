/**
 * Created by viktor.shevchenko on 4/29/2016.
 */
const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {};
    case 'TOGGLE_TODO':
      return {};
    case 'SERVER_DATA_FETCHED':
      return Object.assign({}, state, action.backup_data);
    default:
      return state;
  }
};

export default mainReducer;