import gitUrlIsOk from '../functions/git_url_is_ok.js';
import progresBar from './boot/progress_bar.js';
import fs from 'fs';
import isWindows from 'is-windows';
import shelljs from 'shelljs';

const git_url_original = document.querySelector('[name="git_url[original]"]');
const git_url_result = document.querySelector('[name="git_url[result]"]');
const action_read = document.querySelector('[data-action="read"]');
const action_extract = document.querySelector('[data-action="extract"]');

let isOk = false;
let actionData = {};

const events = {
  git_url_original: {
    change(e) {
      let is_ok = (git_url_original.value && (git_url_original.value.length > 1) && gitUrlIsOk(git_url_original.value));
      if (!is_ok) {
        git_url_result.setAttribute('disabled', 'disabled');
        git_url_result.parentNode.classList.add('disabled');
      } else {
        git_url_result.removeAttribute('disabled');
        git_url_result.parentNode.classList.remove('disabled');
      }
    },
    keydown(e) {
      events.git_url_original.change(null);
    }
  },
  git_url_result: {
    change(e) {
      let is_ok = (git_url_result.value && (git_url_result.value.length > 1) && gitUrlIsOk(git_url_result.value)) && isOk;
      if (!is_ok) {
        action_read.setAttribute('disabled', 'disabled');
        action_read.parentNode.classList.add('disabled');
      } else {
        action_read.removeAttribute('disabled');
        action_read.parentNode.classList.remove('disabled');
      }
    },
    keydown(e) {
      events.git_url_result.change(null);
    }
  },
  document: {
    requirements_status_changed: function (data) {
      isOk = data.detail.isOk;
      events.git_url_result.change(null);
    }
  },
  action_read: {
    click: function (e) {
      progresBar.add(
        function () {
          if (!fs.existsSync('Vagrantfile')) {
            let process = shelljs.exec(
              "vagrant init MekDrop/GitExtract-Work-Box",
              {
                async: false,
                silent: true
              }
            );
            return process.code == 0;
          } else {
            return true;
          }
        },
        function () {
          if (fs.existsSync('Vagrantfile')) {
            shelljs.rm('-rf', 'Vagrantfile');
          }
          return true;
        }
      );
      progresBar.add(
        function () {
          let process = shelljs.exec(
            "vagrant up --destroy-on-error --provision --install-provider",
            {
              async: false,
              silent: true
            }
          );
          return process.code == 0;
        },
        function () {
          if (fs.existsSync('.vagrant')) {
            shelljs.rm('-rf', '.vagrant');
          }
          return true;
        }
      );
      progresBar.add(
        function () {
          const null_device = isWindows() ? 'NULL' : '/dev/null';
          let process = shelljs.exec(
            'vagrant ssh -c "hostname -I | cut -d\' \' -f2" 2>' + null_device,
            {
              async: false,
              silent: true
            }
          );
          actionData.virtual_box_ip = process.stdout;
          return process.code == 0;
        },
        function () {
          // What we can we do if can't detect ip?
        }
      )
    }
  }
};

git_url_original.addEventListener('change', events.git_url_original.change);
git_url_original.addEventListener('keydown', events.git_url_original.keydown);
git_url_result.addEventListener('change', events.git_url_result.change);
git_url_result.addEventListener('keydown', events.git_url_result.keydown);
document.addEventListener('requirements_status_changed', events.document.requirements_status_changed);

events.git_url_original.change(null);
events.git_url_result.change(null);
