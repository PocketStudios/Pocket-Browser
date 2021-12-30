function changeURL(tab,event) {
if (tab == tabGroup.getActiveTab()) {
    if (tab.loadingSystemPage) {
        if (tab.webview.src.startsWith("file:///")) {
            return;
        }
    }
    document.getElementById("address").value = event.url;
    changeSecure()
    if (tab.webview.src.startsWith("file:///")) return;
        checkHistory(event.url)
}
}