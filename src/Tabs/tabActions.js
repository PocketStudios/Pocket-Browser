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
function find() {
    let fullDiv = document.createElement("div")
    let input = document.createElement("input");
    input.className = "input mb-3";
    input.id = "find";
    let lineBreak = document.createElement("br");
    let confirmButton = document.createElement("button");
    confirmButton.onclick = function() {
        tabGroup.getActiveTab().webview.findInPage(document.getElementById('find').value);
    }
    confirmButton.innerHTML = "Find"
    confirmButton.classList = "button is-info mb-4";
    let closeButton = document.createElement("button");
    closeButton.innerHTML = "Close"
    closeButton.classList = "button is-danger";
    closeButton.onclick = function () {
        Swal.close();
    }
    fullDiv.append(input)
    fullDiv.append(lineBreak)
    fullDiv.append(confirmButton)
    fullDiv.append(closeButton)
    Swal.fire({
        title: "Find in Page",
        position: 'top-end',
        showConfirmButton: false,
        showCancelButton: false,
        confirmButtonText: "Find",
        html: fullDiv
    })
}
function darkWebsite() {
    if (dark == "true") {
        tabGroup.eachTab(function (tab) {
            tab.webview.executeJavaScript("document.body.style.backgroundColor = 'black';\ndocument.body.style.color = 'white';")
        })
    }
}