const TrayWindow = require("electron-tray-window");

const { ipcMain, Tray, app, BrowserWindow } = require("electron");
const path = require("path");

app.on("ready", () => {
    var timeout = 10;
    if (process.platform === "linux") {
        timeout = 200;
    }
    setTimeout(function () {
        TrayWindow.setOptions({
            trayIconPath: "window/icon.png",
            windowUrl: `file://${path.join(__dirname, "window/index.html")}`,
            //windowUrl: "https://google.com",
            width: 340,
            height: 380,
        });
    }, timeout);
});