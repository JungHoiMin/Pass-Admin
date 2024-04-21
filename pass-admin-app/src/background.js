"use strict";

import { app, BrowserWindow } from "electron";

let win = null;

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
