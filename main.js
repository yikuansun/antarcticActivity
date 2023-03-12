const TrayWindow = require("electron-tray-window");

const { ipcMain, Tray, app, BrowserWindow } = require("electron");
const path = require("path");

app.on("ready", () => {
    var timeout = 10;
    if (process.platform === "linux") {
        timeout = 500;
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
        mainWindow.loadFile(path.join(__dirname, "window/index.html"));
        require("@electron/remote/main").enable(mainWindow);

        TrayWindow.setOptions({
            trayIconPath: "window/icon.png",
            window: mainWindow,
        });
    }, timeout);
});