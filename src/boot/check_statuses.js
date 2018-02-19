import commandExists from 'command-exists';
import isOnline from 'is-online';
import gitUrlIsOk from '../functions/git_url_is_ok.js';
import formatPath from '../functions/format_path.js';
import chdir from 'chdir';
import fs from 'fs';

let statuses = document.getElementById('statuses_list');

statuses.querySelectorAll('[data-tool][data-check="command-exists"]').forEach(
  function (el) {
    "use strict";
    let tool = el.dataset.tool;
    let paths = el.dataset.paths;
    if (paths) {
      let m = JSON.parse(
        paths.trim()
      ).map(
        function (path) {
          return formatPath(path);
        }
      ).filter(
        (path) => path && path.length > 1
      ).map(
        function (path) {
          var ret = false;
          chdir(path, function () {
            ret = fs.existsSync(tool + '.exe');
          });
          return ret;
        }
      ).filter(
        (exist) => exist == true
      );
      el.className = (
        m.length > 0
      ) ? 'ok' : 'error';
    } else {
      commandExists(tool).then(function (command) {
        el.className = 'ok';
      }).catch(function () {
        el.className = 'error';
      });
    }
  }
);

statuses.querySelectorAll('[data-file][data-check="file-exists"]').forEach(
  (el) => {
    "use strict";
    let file = formatPath(el.dataset.file);
    el.className = fs.existsSync(file) ? 'ok' : 'error';
  }
);

setInterval(
  function () {
    isOnline().then(online => {
      statuses.querySelector('[data-check="internet-connection"]').className = online ? 'ok' : 'error';
    });

    let lis = Array.prototype.slice.call(
      statuses.querySelectorAll('li')
    );
    let lic = lis.length;

    let btn = document.getElementById('action');
    let disabled = lis.filter(
        li => li.className == 'ok'
      ).length != lic || !gitUrlIsOk(document.querySelector('[name="git_url[original]"]').value) || !gitUrlIsOk(document.querySelector('[name="git_url[result]"]').value);

    if (!disabled && btn.hasAttribute('disabled')) {
      btn.removeAttribute('disabled');
    } else if (disabled && !btn.hasAttribute('disabled')) {
      btn.setAttribute('disabled', 'disabled');
    }
  },
  500
);
