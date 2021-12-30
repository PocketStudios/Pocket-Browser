function changeSecure() {
    let url = tabGroup.getActiveTab().webview.src;
    if (url.startsWith("https://")) {
        document.getElementById("secure-icon").src = "resources/icons/security.png"
    } else if (url.startsWith("http://")) {
        document.getElementById("secure-icon").src = "resources/icons/insecure.png"
    } else if (url.startsWith("file:///")) {
        document.getElementById("secure-icon").src = "node_modules/bootstrap-icons/icons/info.svg"
    }
}