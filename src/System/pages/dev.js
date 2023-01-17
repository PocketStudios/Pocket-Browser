window.addEventListener("load",function () {
document.getElementById('pocket-dev-tools').addEventListener('click',function () {require("@electron/remote").remote.BrowserWindow.getAllWindows().forEach(window => window.openDevTools())})
})