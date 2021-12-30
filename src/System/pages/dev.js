window.addEventListener("load",function () {
document.getElementById('pocket-dev-tools').addEventListener('click',function () {require("@electron/remote").BrowserWindow.getAllWindows().forEach(window => window.openDevTools())})
})