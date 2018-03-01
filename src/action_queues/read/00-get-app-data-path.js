import actionData from '../../functions/shared_dict.js';
import shelljs from 'shelljs';
import {remote} from 'electron';

export function good() {
  actionData.set('app_data_path',
    remote.app.getPath('userData')
  );
  shelljs.mkdir('-p', actionData.get('app_data_path'));
  let current_pwd = shelljs.pwd();
  shelljs.cd(
    actionData.get('app_data_path')
  );
  return true;
};

export function bad() {
  // what we can do here?
  return true;
}
