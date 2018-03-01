import fs from 'fs';
import shelljs from 'shelljs';

export function good() {
  let exited_code = null;
  shelljs.exec(
    "vagrant init -m -f MekDrop/GitExtract-Work-Box",
    {
      async: false,
      silent: true
    },
    function (code, stdout, stderr) {
      exited_code = code;
      console.log(code);
    }
  );
  return exited_code == 0;
};

export function bad() {
  if (fs.existsSync('Vagrantfile')) {
    shelljs.rm('-rf', 'Vagrantfile');
  }
  return true;
};
