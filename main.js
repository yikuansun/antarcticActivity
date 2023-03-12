const TrayWindow = require("electron-tray-window");

const { ipcMain, Tray, app, BrowserWindow } = require("electron");
const path = require("path");

app.on("ready", () => {
    var timeout = 10;
    if (process.platform === "linux") {
        timeout = 200;
    }
    setTimeout(function () {
        var mainWindow = new BrowserWindow({
            width: 300,
            height: 400,
            backgroundColor: "#222222",
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                contextIsolation: false,
            },
        });
        mainWindow.loadURL("window/index.html");

        TrayWindow.setOptions({
            trayIconPath: "window/icon.png",
            window: mainWindow,
        });
    }, timeout);
});