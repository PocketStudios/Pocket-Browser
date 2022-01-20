let Downloads = [];

require("@electron/remote").session.defaultSession.on('will-download', function (event, item, webContents) {
    if (Downloads[item.getFilename()]) item.cancel();
    Downloads[item.getFilename()] = item;
})