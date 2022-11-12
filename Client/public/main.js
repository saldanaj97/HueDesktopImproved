const { app, BrowserWindow } = require("electron");

try {
  require("electron-reloader")(module);
} catch (_) {}

/* Code to open a window */
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    //titleBarStyle: "hidden",
    width: 700,
    height: 320,
    minWidth: 700,
    minHeight: 320,
    backgroundColor: "#5e5e5e",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Background color of the window
  mainWindow.setBackgroundColor("#5e5e5e");

  // Load the index.html from file
  mainWindow.loadURL("http://localhost:3000");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

/* This method will be called when Electron has finished
   initialization and is ready to create browser windows.
   Some APIs can only be used after this event occurs. */
app.whenReady().then(createWindow);

// (Mac OS only ) Activating an app when no windows are open should open a new one
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

/* Quit when all windows are closed, except on macOS. There, it's common
   for applications and their menu bar to stay active until the user quits
   explicitly with Cmd + Q. */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
