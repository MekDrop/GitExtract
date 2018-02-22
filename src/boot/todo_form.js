import gitUrlIsOk from '../functions/git_url_is_ok.js';
import progresBar from './boot/progress_bar.js';
import {process} from "core-worker";
import fs from 'fs';
import fse from 'fs-extra';

const git_url_original = document.querySelector('[name="git_url[original]"]');
const git_url_result = document.querySelector('[name="git_url[result]"]');
const action_read = document.querySelector('[data-action="read"]');
const action_extract = document.querySelector('[data-action="extract"]');

let isOk = false;

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
            const result = await
            process("vagrant init MekDrop/GitExtract-Work-Box").death();
            return result == 0;
          } else {
            return true;
          }
        },
        function () {
          if (fs.existsSync('Vagrantfile')) {
            fs.unlinkSync('Vagrantfile');
          }
          return true;
        }
      );
      progresBar.add(
        function () {
          const result = await
          process("vagrant up --destroy-on-error --provision --install-provider").death();
          return result == 0;
        },
        function () {
          if (fs.existsSync('.vagrant')) {
            fse.removeSync('.vagrant');
          }
          return true;
        }
      );
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
