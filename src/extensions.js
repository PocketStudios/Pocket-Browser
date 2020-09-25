/*
 * © 2020 - Pocket Inc.
 */
//Browser Reference
window.browser = function () {};

//Tabs
tab = browser.tab = function () {};

//Create a tab of URL.
tab.create = function (url) {
    addTab(url);
    return true;
}
//Close a tab using it's ID.
tab.close = function (ID) {
tabGroup.getTab(ID).close()
    return true;
}
//Get Active Tab ID.
tab.getActiveTab = function () {
    return tabGroup.getActiveTab().id;
}
//Load URL of Tab ID.
tab.loadURL = function (ID,url) {
    tabGroup.getTab(ID).webview.loadURL(url);
    return true;
}
//Get URL of Tab ID.
tab.getURL = function (ID) {
    return tabGroup.getTab(ID).webview.src;
}

//Settings
settings = browser.settings = function () {};

settings.getTheme = function () {
    if (darkMode == true) return "Dark";
    else return "Light";
}
settings.getHome = function () {
    if (homePage) return homePage;
}
settings.getEngine = function () {

}
settings.getVersion = function () {
    return browserVersion;
}
//Logging

log = browser.log = function () {}

log.info = function (msg) {
    pocket.info(msg);
}
log.error = function (msg) {
    pocket.error(msg)
}
//Events
//InComplete.

//Loading Extensions
const lbl = require("line-by-line");
window.onload = function () {
    if (!require("fs").existsSync(require("electron").remote.app.getPath("userData") + "/data/extensions.pocket")) return;
    const lblExtensions = new lbl(dataPath + "/data/extensions.pocket")

    lblExtensions.on("line", function (line) {
        var tag = document.createElement("script");
        tag.src = line + "/api.js";
        document.getElementById("extensions").appendChild(tag);
    })
}