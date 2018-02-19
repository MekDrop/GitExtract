import {app, BrowserWindow} from "electron";

export const menu_file = {
  label: "File",
  submenu: [
    {
      label: "New", accelerator: "CmdOrCtrl+N",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      }
    },
    {type: "separator"},
    {
      label: "Exit", accelerator: "Alt+F4",
      click: () => {
        app.exit(0);
      }
    }
  ]
};
