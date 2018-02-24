import isWindows from 'is-windows';
import shelljs from 'shelljs';
import actionData from '../functions/shared_dict.js';

export function good() {
  const null_device = isWindows() ? 'NULL' : '/dev/null';
  let process = shelljs.exec(
    'vagrant ssh -c "hostname -I | cut -d\' \' -f2" 2>' + null_device,
    {
      async: false,
      silent: true
    }
  );
  actionData.set('virtual_box_ip', process.stdout);
  return process.code == 0;
};

export function bad() {
  // what we can do here?
}
