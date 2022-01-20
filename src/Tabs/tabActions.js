function toggleDevTools() {
let currentTab = tabGroup.getActiveTab().webview;
if (currentTab.isDevToolsOpened()) {
    currentTab.closeDevTools();
} else {
    currentTab.openDevTools()
}
}
function toggleFullScreen() {
        let newState = !require("@electron/remote").getCurrentWindow().isFullScreen();
        require("@electron/remote").getCurrentWindow().setFullScreen(newState);
        if (newState == false) {
            document.getElementById("fullScreen").src = "node_modules/bootstrap-icons/icons/fullscreen.svg"
        } else {
            document.getElementById("fullScreen").src = "node_modules/bootstrap-icons/icons/fullscreen-exit.svg"
        }
}

function zoom(type) {
    if (type == "add") {
        var newZoom = tabGroup.getActiveTab().webview.getZoomLevel() + 0.5;
        tabGroup.getActiveTab().webview.setZoomLevel(newZoom)
    } else if (type == "minus") {
        var newZoom = tabGroup.getActiveTab().webview.getZoomLevel() - 0.5;
        tabGroup.getActiveTab().webview.setZoomLevel(newZoom)
    }
}