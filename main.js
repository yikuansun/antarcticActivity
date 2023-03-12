
const { ipcMain, Tray, app, BrowserWindow, Menu } = require("electron");
const path = require("path");
require("@electron/remote/main").initialize();

var tray = null, mainWindow;
app.on("ready", () => {
    var timeout = 10;
    if (process.platform === "linux") {
        timeout = 200;
    }
    setTimeout(function () {
        mainWindow = new BrowserWindow({
            width: 300,
            height: 400,
            backgroundColor: "#222222",
            frame: false,
            alwaysOnTop: true,
            show: false,
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

        tray = new Tray("window/icon.png");
        tray.setContextMenu(Menu.buildFromTemplate([
            {
                label: "Show/Hide Window",
                click: function() {
                    if (!mainWindow.isVisible()) mainWindow.show();
                    else mainWindow.hide();
                }
            },
            { label: "Terminate", role: "quit" }
        ]));
    }, timeout);
});