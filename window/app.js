var fs = require("fs");
var path = require("path");
var { app } = require("@electron/remote");

var saveFilePath = path.join(app.getPath("userData"), "saveFile.json");
if (!fs.existsSync(saveFilePath)) fs.writeFileSync(saveFilePath, "[]");
var saveFileData = JSON.parse(fs.readFileSync(saveFilePath));

var currentSessionData = {
    date: (new Date()).toString(),
    timeElapsed: 0,
};
saveFileData.push(currentSessionData);

var startupTime = (new Date()).getTime();

function getScreentime() {
    var currentTime = (new Date()).getTime();
    var timeElapsed = currentTime - startupTime;

    currentSessionData.timeElapsed = timeElapsed;
    fs.writeFileSync(saveFilePath, JSON.stringify(saveFileData));
}

setInterval(getScreentime, 60000);