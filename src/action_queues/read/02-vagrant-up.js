import fs from 'fs';
import shelljs from 'shelljs';

export function good() {
  let process = shelljs.exec(
    "vagrant up --destroy-on-error --provision --install-provider",
    {
      async: false,
      silent: true
    }
  );
  return process.code == 0;
};

export function bad() {
  if (fs.existsSync('.vagrant')) {
    shelljs.rm('-rf', '.vagrant');
  }
  return true;
};
