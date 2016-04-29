/**
 * Created by viktor.shevchenko on 4/29/2016.
 */
const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [];
    case 'TOGGLE_TODO':
      return [];
    default:
      return {
        "url": "/ui/SetupBackupCreate",
        "nonce": "71afdb33efb169ee62a20a00020f1c2a",
        "local_backup_exists": false,
        "backup_size": "28.5 GiB",
        "backup_size_reduced": "24.3 GiB",
        "warn_local_disk_space": true,
        "warn_local_disk_space_reduced": true,
        "standalone": true,
        "changes_in_progress": false
      }
  }
};

export default mainReducer;