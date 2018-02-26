import isWindows from 'is-windows';
import shelljs from 'shelljs';
import actionData from '../functions/shared_dict.js';
import sha1 from 'sha1';

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
  content.innerHTML = '';
  let parent_list = document.createElement('ul')
  content.appendChild(parent_list);
  process.stdout
    .split("\n")
    .map(
      (file) => file.trim()
    )
    .filter()
    .forEach(
      function (file) {
        let parts = file.split('/');
        let parent = parent_list;
        for (let i = 0; i < parts.length; i++) {
          let id = 'file:' + parts.slice(0, i).join('/');
          let el = document.getElementById(id);
          // finish this
          if (!el) {
            el = document.createElement('li');
            el.id = id;
            el.className == (i != parts.length) ? 'folder' : 'file';
            parent.appendChild(el);
          }
          parent = el;
        }
      }
    );

  actionData.set(
    'files',
  );
  return process.code == 0;
};

export function bad() {
  // we can't do here anything
  return true;
};
