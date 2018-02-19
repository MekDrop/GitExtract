import homedir from 'homedir';
import replaceall from 'replaceall';

const special_paths = {
  homepath: replaceall('\\', '/', homedir()),
  VBOX_INSTALL_PATH: process.env.VBOX_INSTALL_PATH,
  VBOX_MSI_INSTALL_PATH: process.env.VBOX_MSI_INSTALL_PATH
};

export default function (path) {
  "use strict";

  if (!path) {
    return path;
  }

  Object.keys(special_paths).map(function (key, index) {
    if (!special_paths[key]) {
      special_paths[key] = '';
    }
    path = replaceall('%' + key + '%', special_paths[key], path);
  });

  return path;
}
