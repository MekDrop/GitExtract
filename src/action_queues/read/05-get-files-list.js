import isWindows from 'is-windows';
import shelljs from 'shelljs';
import actionData from '../../functions/shared_dict.js';
import generateTree from '../../functions/tree_generator.js';

export function good() {
  const null_device = isWindows() ? 'NULL' : '/dev/null';
  let process = shelljs.exec(
    'vagrant ssh -c "cd ' + actionData.get('repo_path') + ' && git log --name-only --pretty=format:" 2>' + null_device,
    {
      async: false,
      silent: true
    }
  );
  const content = document.querySelector('div > div:last-child .content')
  generateTree(content, process.stdout);

  actionData.set(
    'files',
  );
  return process.code == 0;
};

export function bad() {
  // we can't do here anything
  return true;
};
