function isSystemPage(target) {
    let url = document.getElementById("address").value;
    if (target) url = target;
    if (url.startsWith("pocket://")) {
        if (require("fs").existsSync(__dirname + "/src/System/pages/" + url.slice(9) + ".html")) {
            return true;
        }
    } else {
        return false;
    }
    return false;
}
function loadSystemPage(target,current = false,part = "") {
let page = document.getElementById("address").value.slice(9);
if (target) page = target;
if (require("fs").existsSync(__dirname + "/src/System/pages/" + page + ".html")) {
        let position;
        if (current) {
            position = tabGroup.getActiveTab().getPosition() | 0;
            tabGroup.getActiveTab().close();
        }
        let electron = require("@electron/remote");
        let newTab = tabGroup.addTab({
            src: __dirname + "/src/System/pages/" + page + ".html#" + part,
            active: true,
            title: page[0].toUpperCase() + page.slice(1),
            visible: true,
            closable: true,
            webviewAttributes: {
                preload: __dirname + "/src/System/pages/" + page + ".js"
            }
        })
    if (current) newTab.setPosition(position)

        newTab.loadingSystemPage = page;
        newTab.loadingSystemPart = part;
        newTab.on("webview-dom-ready", function () {
            require("@electron/remote").require("@electron/remote/main").enable(electron.webContents.fromId(newTab.webview.getWebContentsId()))
        })
        document.getElementById('address').value = "pocket://" + page
        newTab.setIcon(__dirname + "/resources/icons/s-icon.png")
        addEvents(newTab)

}
}