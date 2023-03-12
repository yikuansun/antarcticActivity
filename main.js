
const { ipcMain, Tray, app, BrowserWindow } = require("electron");
const path = require("path");
require("@electron/remote/main").initialize();

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
            alwaysOnTop: true,
            show: true,
            useContentSize: true,
            webPreferences: {
                nodeIntegration: true,
                enableRemoteModule: true,
                contextIsolation: false,
                backgroundThrottling: false,
            },
        });
        mainWindow.loadFile(path.join(__dirname, "window/index.html"));
        require("@electron/remote/main").enable(mainWindow.webContents);

    }, timeout);
});