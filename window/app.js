var fs = require("fs");
var path = require("path");
var { app } = require("@electron/remote");

var saveFilePath = path.join(app.getPath("userData"), "saveFile.json");
if (!fs.existsSync(saveFilePath)) fs.writeFileSync(saveFilePath, "{}");

var startupTime = (new Date()).getTime();

function getScreentime() {
    var currentTime = (new Date()).getTime();
    var timeElapsed = currentTime - startupTime;

    document.write(timeElapsed);
}

setInterval(getScreentime, 200);