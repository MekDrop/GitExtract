import fs from 'fs';
import shelljs from 'shelljs';

export function good() {
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
};

export function bad() {
  if (fs.existsSync('Vagrantfile')) {
    shelljs.rm('-rf', 'Vagrantfile');
  }
  return true;
};
