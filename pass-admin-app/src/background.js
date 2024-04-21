"use strict";

import { app, BrowserWindow, Tray, Menu, globalShortcut } from "electron";

const BASE_URL = "http://localhost:8080/";
let win = null;
let tray = null;
let passWordPopup = null;

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
  await win.loadURL(BASE_URL);
};

const createPassWordPopup = async () => {
  if (passWordPopup === null || passWordPopup.isDestroyed()) {
    passWordPopup = new BrowserWindow({
      parent: win,
      modal: true,
      titleBarStyle: "hidden",
    });
    await passWordPopup.loadURL(BASE_URL + "master-auth");
  } else {
    passWordPopup.focus();
  }
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
  const CTRL = "CmdOrCtrl";
  const SHIFT = "Shift";
  const ALT = "Alt";

  const getAccelerator = (commandList) => {
    return commandList.join("+");
  };
  createTray();

  globalShortcut.register(getAccelerator([CTRL, SHIFT, ALT, "]"]), async () => {
    await createPassWordPopup();
  });
});

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

app.on("activate", async () => {
  if (BrowserWindow.getAllWindows().length === 0) await createWindow();
});

app.on("ready", async () => {
  await createWindow();
});
