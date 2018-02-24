import isWindows from 'is-windows';
import shelljs from 'shelljs';
import actionData from '../functions/shared_dict.js';
import sha1 from 'sha1';

export function good() {
  const null_device = isWindows() ? 'NULL' : '/dev/null';
  actionData.set('repo_path', sha1(git_url_original.value) + '-' + git_url_original.value.length);
  let process = shelljs.exec(
    'vagrant ssh -c "git clone ' + git_url_original.value + ' ' + actionData.get('repo_path') + '" 2>' + null_device,
    {
      async: false,
      silent: true
    }
  );
  return process.code == 0;
};

export function bad() {
  const null_device = isWindows() ? 'NULL' : '/dev/null';
  let process = shelljs.exec(
    'vagrant ssh -c "rm -rf ' + actionData.get('repo_path', '__tmp_') + '" 2>' + null_device,
    {
      async: false,
      silent: true
    }
  );
  return process.code == 0;
};
