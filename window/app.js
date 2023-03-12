const { powerMonitor } = require("@electron/remote");

document.write(powerMonitor.getSystemIdleTime());