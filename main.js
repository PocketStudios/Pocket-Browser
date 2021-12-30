const {app, BrowserWindow, globalShortcut, session} = require('electron')
const path = require('path')
require('v8-compile-cache');
require('@electron/remote/main').initialize()

function createWindow () {
   const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
      enableRemoteModule: true,
        contextIsolation: false
    }
  })
    require('@electron/remote/main').enable(mainWindow.webContents)
    // load the index.html of the app.
  mainWindow.loadFile('index.html')
  // remove the default electronjs menu
  mainWindow.setMenu(null)

  const newAgent = mainWindow.webContents.getUserAgent().replace(" Electron/" + process.versions['electron'],"")
  mainWindow.webContents.setUserAgent(newAgent)
    // When edited, should be edited in createTabs.js

    session.defaultSession.on("will-download",function (e,item) {
        item.setSavePath(app.getPath("downloads") + "/" + item.getFilename())
    })
    if (process.env.ELECTRON_ENV == "dev") {
    mainWindow.openDevTools();
    }
 }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})
app.on("will-quit",function () {globalShortcut.unregisterAll()})