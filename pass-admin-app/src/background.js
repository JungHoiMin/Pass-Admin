"use strict";

import { app, BrowserWindow, Tray, Menu } from "electron";

let win = null;
let tray = null;

const destroyApp = () => {
  if (tray && !tray.isDestroyed()) tray.destroy();
  app.quit();
};

const createWindow = async () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      webSecurity: false,
    },
  });
  await win.loadURL("http://localhost:8080");
};

const createTray = () => {
  if (tray === null) {
    tray = new Tray("src/assets/logo.png");
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "메인 열기",
        type: "normal",
        click: () => {
          win.show();
        },
      },
      { label: "종료", type: "normal", click: destroyApp },
    ]);

    tray.setToolTip("패스어드민");
    tray.setContextMenu(contextMenu);
  }
};

app.whenReady().then(() => {
  createTray();
});

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  createWindow();
});
