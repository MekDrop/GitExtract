import { app, BrowserWindow } from "electron";

export const menu_dev = {
  label: "Development",
  submenu: [
    {
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.reloadIgnoringCache();
      }
    },
    {
      label: "Toggle DevTools",
      accelerator: "Alt+CmdOrCtrl+I",
      click: () => {
        BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    }
  ]
};
