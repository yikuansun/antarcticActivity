var startupTime = (new Date()).getTime();

function getScreentime() {
    var currentTime = (new Date()).getTime();
    var timeElapsed = currentTime - startupTime;

    document.write(timeElapsed);
}

setInterval(getScreentime, 200);