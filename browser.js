/*
 The Official Pocket Browser Code,
 Created and Written by the Pocket, Inc.
 © 2020 Pocket Inc.
 github.com/PocketInc/Pocket-Browser
 */

// Require all external modules.
// NPM.
const electron = require("electron").remote
const fs = require("fs");
const log = require('electron-log');

//Variable used to save homePage URL.
var homePage;

// Log that browser is starting.
log.info("Starting browser..")

//the webview variable defaults to mainTab webview.
var webview = mainTab.webview;
//Online State variable to track if internet connection is available.
var onlineState = true;


// Function to go back in active tab.
function goBack() {
    // get the active tab
    var getTab = tabGroup.getActiveTab();
    //if the webview can go back.
    if(getTab.webview.canGoBack()) {
        //log, then go back and change address.
        log.info("Going back on request.")
        getTab.webview.goBack();
        changeAddress(getTab);
    }
}
// Function to go forward in active tab.
function goForward() {
    // get the active tab
    var getTab = tabGroup.getActiveTab();
    //if the webview can go forward.
    if(getTab.webview.canGoForward()) {
        //log, go forward and change address.
        log.info("Going forward on request.")
        getTab.webview.goForward();
        changeAddress(getTab);
    }
}

//function to go to homepage in active tab.
function goHome() {
    // get active tab.
    var getTab = tabGroup.getActiveTab();
    //log, read the file containing the home page url, then if error, then load duck.com. otherwise load the url.
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

//function to reload active  tab.
function reloadPage() {
    var getTab = tabGroup.getActiveTab();
    log.info("Reloading on request..")
    getTab.webview.reload();
}

//function to change favicon. powered by the favicon updated event.
//event code can be found in events.js

function changeFavicon(event,tab) {
    //try, if catched error log it.
    try {
        log.info("Favicon changed for " + tab)
        //event.favicons[0] = the favicon url taken from event.
        tab.setIcon(event.favicons[0])
    } catch(err) {
        log.error("Error occured while changing favicon: " + err)
    }
}
//function to change title.
//powered by the title updated event in events.js
function changeTitle(target,event) {
//try, if catched error, log it.
    try {
        log.info("Title changed.")

        //if the title is empty, then do nothing.
        //if title is longer than 30 chars, then cut only 30 chars from it and set them as title.
        //otherwise, set title.

        var viewTitle = event.title;
        if (viewTitle === "") {
            //nothing for now
            log.info("Empty title.")
        } else {
            if (viewTitle.length > 30) {
                log.warn("title is long.")
                target.setTitle(viewTitle.slice(0,30) + "..") //set tab title.
                if (tabGroup.getActiveTab() == target) { // if the active tab is the tab that needs title change.
                    electron.getCurrentWindow().title = viewTitle + " - Pocket Browser" // then change the window title.
                }
            } else {
                if (tabGroup.getActiveTab() == target) {
                    electron.getCurrentWindow().title = viewTitle + " - Pocket Browser"
                }
                target.setTitle(viewTitle);
            }
        }
    } catch(err) {
        log.error("Log occured while changing title: " + err);
    }
}

//function to load DevTools.
//button in tool menu. (Developer Tools)
function loadDev() {
    //get active tab, if tools are openned, then close them. otherwise open them.
    var getTab = tabGroup.getActiveTab();
    log.info("Toggling DevTools from " + getTab.webview.isDevToolsOpened() + " to " + !getTab.webview.isDevToolsOpened())
    if (getTab.webview.isDevToolsOpened()) {
        getTab.webview.closeDevTools();
    } else {
        getTab.webview.openDevTools();
    }
}

//function when no internet detected.
function wentOffline() {
    //if onlineState is true (so there was internet before)
    //then log it, and unhide the wifi icon and send notification.
    if (onlineState === true) {
        log.warn("Connection lost.")
        onlineState = false;
        document.getElementById("wifi").hidden = "";
        let myNotification = new Notification('Connection Lost!', {
            body: "Please check your Internet Connection.",
            icon: "s-icon.png"
        })

    }
}

//function when internet is detected.

function backOnline() {
    //if onlineState is false (so there was no internet before)
    //then log it, and hide the wifi icon and send notification.

    if (onlineState === false) {
        log.warn("Connection is back.")
        onlineState=true;
        document.getElementById("wifi").hidden = "hidden";

        let myNotification = new Notification('Connection is back!', {
            body: "You're reconnected to the Internet.",
            icon: "s-icon.png"
        })
    }
}

var loadingSystemPage = false; // variable used to identify if a system page is being loaded.

//function loaded when person clicks in "Go" button in browser.
function loadURL() {
    //get the value of the web address input field
    var url = document.getElementById("address").value;
    //if the url is a system page (pocket://(thing)), then load system page.
    //otherwise, get active tab and identify if url is https, then load page.
    //if url is http, then load url.
    //if url is file:///, then load local file.
    // if none, then search using search engine provided in settings.

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
            fs.readFile(__dirname + '/system/data/engine.pocket', function (err, data) {
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
//function used in page loaded event.

function changeAddress(target) {
    //if loading system page, then do nothing.
    //otherwise, if url is http, send warn notification.
    // then turn off the loading gif, and set the address bar value if target tab is same as active one.
    if (loadingSystemPage === true) {
        log.info("No changing address. system page.")
        loadingSystemPage=false;
    } else {
        if (target.webview.src) {
            if (target.webview.src.slice(0, 7) === "http://") {
                let myNotification = new Notification('In-Secure Webpage', {
                    body: "Don't write any personal information.",
                    icon: "s-icon.png"
                })
                log.info("Sent notification due to insecure page.")

            }
            target.setIcon();
            log.info("Changing address. normal URL.")
            if (tabGroup.getActiveTab() === target) {
                document.getElementById("address").value = target.webview.src;
            }
        }


    }


}
// function used when page starts loading.
function changeState(target) {
    //TODO: Make sure refresh bug is fixed.
    if (target.webview.isLoadingMainFrame()) {
        log.info("Changing reloading state to: true by function")
        target.setIcon("./external/loading.gif");
    }

}
