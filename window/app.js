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

function getActivityStats() {
    var todayScreentime = 0;
    var today = new Date();
    for (var session of saveFileData) {
        var sessionDate = new Date(Date.parse(session.date));
        if (sessionDate.getDate() == today.getDate() && sessionDate.getMonth() == today.getMonth() && sessionDate.getFullYear() == today.getFullYear()) {
            todayScreentime += session.timeElapsed;
        }
    }
    document.querySelector("#todaystDisplay").innerHTML = todayScreentime;
}

setInterval(getScreentime, 60000);
getActivityStats();
setInterval(getActivityStats, 60000);