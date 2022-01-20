function changeURL(tab,event) {
if (tab == tabGroup.getActiveTab()) {
    if (tab.loadingSystemPage) {
        if (tab.webview.src.startsWith("file:///")) {
            return;
        }
    }
    if (!document.activeElement || document.activeElement.id !== "address") document.getElementById("address").value = event.url;
    changeSecure()
    if (tab.webview.src.startsWith("file:///")) return;
        checkHistory(event.url)
}
}