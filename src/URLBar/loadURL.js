function loadURL() {
    if (isSystemPage()) {
        loadSystemPage(false,true)
    } else {
        let url = document.getElementById("address").value;
        tabGroup.getActiveTab().webview.loadURL(url)
        changeSecure()
    }
}