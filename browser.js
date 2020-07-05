const electron = require("electron").remote
const fs = require("fs");
const log = require('electron-log');

var homePage;

log.info("Starting browser..")
var webview = mainTab.webview;
var onlineState = true;

function goBack() {
    var getTab = tabGroup.getActiveTab();
    if(getTab.webview.canGoBack()) {
        log.info("Going back on request.")
        getTab.webview.goBack();
        changeAddress(getTab);
    }
}
function goForward() {
    var getTab = tabGroup.getActiveTab();
    if(getTab.webview.canGoForward()) {
        log.info("Going forward on request.")
        getTab.webview.goForward();
        changeAddress(getTab);
    }
}
function goHome() {
    var getTab = tabGroup.getActiveTab();
    log.info("Going home on request.")
    fs.readFile(__dirname + '/system/data/home.pocket', function (err, data) {
        if (err || data == "") {
            log.error("couldn't read file: ./system/data/home.pocket: " + err)
            getTab.webview.src = "https://duck.com"
            throw err;
        }
        homePage=data;
        getTab.webview.src = data;
        log.info("Loading successfull")

    });
}
function reloadPage() {
    var getTab = tabGroup.getActiveTab();
    log.info("Reloading on request..")
    getTab.webview.reload();
}
function changeFavicon(event,tab) {
    try {
        log.info("Favicon changed for " + tab)
        //event.favicons[0];
        tab.setIcon(event.favicons[0])
    } catch(err) {
        log.error("Error occured while changing favicon: " + err)
    }
}
function changeTitle(target,event) {
//page-title-updated
    try {
        log.info("Title changed.")

        var viewTitle = event.title;
        if (viewTitle === "") {
            //nothing for now
            log.info("Empty title.")
        } else {
            if (viewTitle.length > 50) {

            } else {
                electron.getCurrentWindow().title = viewTitle + " - Pocket Browser"
                target.setTitle(viewTitle);
            }
        }
    } catch(err) {
        log.error("Log occured while changing title: " + err);
    }
}
function loadDev() {
    var getTab = tabGroup.getActiveTab();
    log.info("Toggling DevTools from " + getTab.webview.isDevToolsOpened() + " to " + !getTab.webview.isDevToolsOpened())
    if (getTab.webview.isDevToolsOpened()) {
        getTab.webview.closeDevTools();
    } else {
        getTab.webview.openDevTools();
    }
}
function wentOffline() {
    log.warn("Connection lost.")
    onlineState=false;
    loadSystemPage("connection")


}
function backOnline() {
    if (onlineState === false) {
        log.warn("Connection is back.")
        goBack();
        onlineState=true;
    }
}

var loadingSystemPage = false;
function loadURL() {
    var url = document.getElementById("address").value;

    if (isSystemPage(url)) {
        log.info("Loading system page: " + url);
        loadingSystemPage=true;
        openSystemPage(url.slice(9).toLowerCase());
    } else {
        var getTab = tabGroup.getActiveTab();
        log.info("Attempting to load URL: " + url);
        if (url.slice(0, 8).toLowerCase() === "https://") {
            log.info("Loading via HTTPS")
            loadingSystemPage=false;
            getTab.webview.src = url;
        } else if (url.slice(0, 7).toLowerCase() === "http://") {
            log.info("Loading via HTTP")
            loadingSystemPage=false;
            getTab.webview.src = url;
        } else if (url.slice(0, 8).toLowerCase() === "file:///") {
            log.info("Loading local file")
            loadingSystemPage=false;
            getTab.webview.src = url;
        } else {
            log.info("Loading via Search.")
            loadingSystemPage=false;
            fs.readFile('/resources/engine.pocket', function (err, data) {
                if (err) {
                    log.error("Couldn't read file: ./system/data/engine.pocket: " + err)
                    throw err;
                }
                getTab.webview.src = String(data).replace("%s",url);
                log.info("Searched via search engine: " + data)
            });
        }


    }
}
function changeAddress(target) {
    if (loadingSystemPage === true) {
        log.info("No changing address. system page.")
        loadingSystemPage=false;
        document.getElementById("state").hidden = true
    } else {
        if (target.webview.src) {
            if (target.webview.src.slice(0, 7) === "http://") {
                let myNotification = new Notification('In-Secure Webpage', {
                    body: "Don't write any personal information.",
                    icon: "s-icon.png"
                })
                log.info("Sent notification due to insecure page.")

            }

            log.info("Changing address. normal URL.")
            if (tabGroup.getActiveTab() === target) {
                document.getElementById("address").value = target.webview.src;
            }
        }


    }
    document.getElementById("state").hidden = true

    document.getElementById("reload").className = "btn btn-light";
}
function changeState() {
    log.info("Changing reloading state to: true")
    document.getElementById("state").hidden = false;
    document.getElementById("reload").className = "btn btn-light disabled";
}



window.addEventListener('online',  backOnline)
window.addEventListener('offline', wentOffline)



tabGroup.on("tab-removed", (functionTab, tabGroup) => {
    if (tabGroup.getTabs().length > 0) {
        log.info("Closed a tab, but there's still more tabs..");
    } else {
        log.info("Closed all tabs.");
        addTab();
    }


});
document.getElementById("address").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        log.info("Enter is clicked inside Input URL")
        event.preventDefault();
        document.getElementById("go").click();

    }
});

tabGroup.on("tab-active", (tab, tabGroup) => {
    webview = tab.webview;
    document.getElementById("address").value = tab.webview.src;
    electron.getCurrentWindow().title = tab.webview.getTitle() + " - Pocket Browser";
});