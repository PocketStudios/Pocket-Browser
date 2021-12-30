function toggleDevTools() {
let currentTab = tabGroup.getActiveTab().webview;
if (currentTab.isDevToolsOpened()) {
    currentTab.closeDevTools();
} else {
    currentTab.openDevTools()
}
}