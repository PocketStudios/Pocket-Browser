
function addTab(url) {
    let page;
    if (url) {
        page = url;
    } else {
        page = homePage;
    }

    let newTab = tabGroup.addTab({
        src: page,
        active: true,
        title: "New Tab",
        visible: true,
        closable: true
    })
    addEvents(newTab)
}
function addWindow() {
    let electron = require("@electron/remote");
    let newWindow = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })
    require('@electron/remote').require("@electron/remote/main").enable(newWindow.webContents)
    newWindow.loadFile('index.html')
    newWindow.setMenu(null)

    const newAgent = newWindow.webContents.getUserAgent().replace(" Electron/" + process.versions['electron'],"")
    newWindow.webContents.setUserAgent(newAgent)
}