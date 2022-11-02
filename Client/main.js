const { app, BrowserWindow } = require("electron");
const path = require("path");

try {
  require("electron-reloader")(module);
} catch (_) {}

/* Code to open a window */
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    //titleBarStyle: "hidden",
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
};

/* This method will be called when Electron has finished
   initialization and is ready to create browser windows.
   Some APIs can only be used after this event occurs. */
app.whenReady().then(() => {
  createWindow();

  // (Mac OS only ) Activating an app when no windows are open should open a new one
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/* Quit when all windows are closed, except on macOS. There, it's common
   for applications and their menu bar to stay active until the user quits
   explicitly with Cmd + Q. */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
