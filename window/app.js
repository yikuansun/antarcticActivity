var fs = require("fs");
var path = require("path");
var { app } = require("@electron/remote");
var { ipcRenderer } = require("electron");

function getWeekStart(d=new Date()) {
    var current = new Date(d.getTime());
    var first = current.getDate() - current.getDay();
    var weekFirstDay = new Date(current.setDate(first));
    return weekFirstDay;
}

var saveFilePath = path.join(app.getPath("userData"), "saveFile.json");
if (!fs.existsSync(saveFilePath)) fs.writeFileSync(saveFilePath, JSON.stringify({
    weeks: {},
    days: {},
    sessions: {},
}));
var saveFileData = JSON.parse(fs.readFileSync(saveFilePath));

var currentSessionData = {
    date: (new Date()).toDateString(),
    timeElapsed: 0,
};
saveFileData.sessions[(new Date()).getTime()] = currentSessionData;
var currentDayData, currentWeekData;
if (saveFileData.days[(new Date()).toDateString()]) {
    currentDayData = saveFileData.days[(new Date()).toDateString()];
}
else {
    currentDayData = {
        date: (new Date()).toDateString(),
        timeElapsed: 0,
    };
    saveFileData.days[(new Date()).toDateString()] = currentDayData;
    fs.writeFileSync(saveFilePath, JSON.stringify(saveFileData));
}
if (saveFileData.weeks[(getWeekStart(new Date())).toDateString()]) {
    currentWeekData = saveFileData.weeks[(getWeekStart(new Date())).toDateString()];
}
else {
    currentWeekData = {
        startDate: (getWeekStart(new Date())).toDateString(),
        timeElapsed: 0,
    };
    saveFileData.weeks[(getWeekStart(new Date())).toDateString()] = currentWeekData;
    fs.writeFileSync(saveFilePath, JSON.stringify(saveFileData));
}

function hoursMinutes(ms) {
    var minutes = Math.floor(ms / 60000) % 60;
    var hours = Math.floor(ms / 3600000);
    return "" + ((hours < 10)?"0":"") + hours + ":" + ((minutes < 10)?"0":"") + minutes;
}

function getActivityStats() {
    document.querySelector("#todaystDisplay").innerHTML = hoursMinutes(currentDayData.timeElapsed);

    document.querySelector("#sessionstDisplay").innerHTML = hoursMinutes(currentSessionData.timeElapsed);

    document.querySelector("#currentWeekstDisplay").innerHTML = hoursMinutes(currentWeekData.timeElapsed);
}

setInterval(function() {
    currentSessionData.timeElapsed += 60000;
    currentDayData.timeElapsed += 60000;
    currentWeekData.timeElapsed += 60000;
    fs.writeFileSync(saveFilePath, JSON.stringify(saveFileData));
}, 60000);
getActivityStats();
setInterval(getActivityStats, 60000);

document.querySelector("#closeButton").addEventListener("click", function() {
    ipcRenderer.send("hideWindow");
});