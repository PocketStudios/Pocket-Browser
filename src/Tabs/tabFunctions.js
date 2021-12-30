function tabFavicon(event,tab) {
    if (event.favicons.length > 0) {
        tab.setIcon(event.favicons[0])
    } else {
        tab.setIcon("resources/icons/error.png")
    }
}
let stateImg = ["resources/icons/refresh.png","resources/icons/cross.png"]
function changeState(state) {
    if (state === 0) {
        document.getElementById("state-btn").innerHTML = '<img class="toolbar-icon" src="' + stateImg[0] + '">'
        document.getElementById("state-btn").onclick = reloadTab
    } else if (state === 1) {
        document.getElementById("state-btn").innerHTML = '<img class="toolbar-icon" src="' + stateImg[1] + '">'
        document.getElementById("state-btn").onclick = stopTab
    }
}
function reloadTab() {
    tabGroup.getActiveTab().webview.reload();
}
function stopTab() {
    tabGroup.getActiveTab().webview.stop();
    changeState(0)
}
function tabBack() {
    if (tabGroup.getActiveTab().webview.canGoBack()) {
        tabGroup.getActiveTab().webview.goBack()
    }
}

function tabForward() {
    if (tabGroup.getActiveTab().webview.canGoForward()) {
        tabGroup.getActiveTab().webview.goForward()
    }
}
function goHome() {
    if (isSystemPage(homePage)) return loadSystemPage(homePage.slice(9),true)
    tabGroup.getActiveTab().webview.loadURL(homePage);
}
function changeTitle(target,event) {
    try {
        var viewTitle = event.title;
        if (viewTitle === "") {
            if (target.webview.getTitle() != "") {
                if (target.webview.getTitle().length > 20) {
                    target.setTitle(target.webview.getTitle().slice(0, 20) + "..") //set tab title.
                    target.tabElements.title.title = target.webview.getTitle();
                    if (tabGroup.getActiveTab() == target) { // if the active tab is the tab that needs title change.
                        require("@electron/remote").getCurrentWindow().title = target.webview.getTitle() + " - Pocket Browser" // then change the window title.
                    }
                } else {
                    if (tabGroup.getActiveTab() == target) {
                        require("@electron/remote").getCurrentWindow().title = target.webview.getTitle() + " - Pocket Browser"
                    }
                    target.setTitle(target.webview.getTitle());
                }
            }
        } else {
            if (viewTitle.length > 20) {
                target.setTitle(viewTitle.slice(0, 20) + "..") //set tab title.
                target.tabElements.title.title = viewTitle;
                if (tabGroup.getActiveTab() == target) { // if the active tab is the tab that needs title change.
                    require("@electron/remote").getCurrentWindow().title = viewTitle + " - Pocket Browser" // then change the window title.
                }
            } else {
                if (tabGroup.getActiveTab() == target) {
                    require("@electron/remote").getCurrentWindow().title = viewTitle + " - Pocket Browser"
                }
                target.setTitle(viewTitle);
            }
        }
    } catch (err) {
        console.error("Error " + err + ": while changing title");
    }
}