var fs = require("fs");
var path = require("path");
var { app } = require("@electron/remote");
var { ipcRenderer } = require("electron");

var saveFilePath = path.join(app.getPath("userData"), "saveFile.json");
if (!fs.existsSync(saveFilePath)) fs.writeFileSync(saveFilePath, "[]");
var saveFileData = JSON.parse(fs.readFileSync(saveFilePath));

var currentSessionData = {
    date: (new Date()).toString(),
    timeElapsed: 0,
};
saveFileData.push(currentSessionData);

var startupTime = (new Date()).getTime();

function hoursMinutes(ms) {
    var minutes = Math.floor(ms / 60000) % 60;
    var hours = Math.floor(ms / 3600000);
    return "" + ((hours < 10)?"0":"") + hours + ":" + ((minutes < 10)?"0":"") + minutes;
}

function getScreentime() {
    var currentTime = (new Date()).getTime();
    var timeElapsed = currentTime - startupTime;

    currentSessionData.timeElapsed = timeElapsed;
    fs.writeFileSync(saveFilePath, JSON.stringify(saveFileData));
}

function getActivityStats() {
    var todayScreentime = 0;
    var currentWeekScreentime = 0;
    var today = new Date();
    var weekFirstDay = new Date();
    weekFirstDay.setDate(today.getDate() - today.getDay());
    weekFirstDay.setHours(0);
    weekFirstDay.setMinutes(0);
    var weekLastDay = new Date();
    weekLastDay.setDate(today.getDate() - today.getDay() + 6);
    weekLastDay.setHours(23);
    weekLastDay.setMinutes(59);
    console.log(today, weekFirstDay, weekLastDay)
    for (var session of saveFileData) {
        var sessionDate = new Date(Date.parse(session.date));
        if (sessionDate.getDate() == today.getDate() && sessionDate.getMonth() == today.getMonth() && sessionDate.getFullYear() == today.getFullYear()) {
            todayScreentime += session.timeElapsed;
        }
        if (sessionDate.getTime() <= weekLastDay.getTime() && sessionDate.getTime() >= weekFirstDay.getTime()) {
            currentWeekScreentime += session.timeElapsed;
            console.log("facts", session.timeElapsed)
            console.log(currentWeekScreentime)
        }
        console.log(sessionDate)
    }
    document.querySelector("#todaystDisplay").innerHTML = hoursMinutes(todayScreentime);

    document.querySelector("#sessionstDisplay").innerHTML = hoursMinutes(currentSessionData.timeElapsed);

    document.querySelector("#currentWeekstDisplay").innerHTML = hoursMinutes(currentWeekScreentime);
}

setInterval(getScreentime, 60000);
getActivityStats();
setInterval(getActivityStats, 60000);

document.querySelector("#closeButton").addEventListener("click", function() {
    ipcRenderer.send("hideWindow");
});