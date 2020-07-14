/*
 The Official Pocket Browser Code,
 Created and Written by the Pocket, Inc.
 © 2020 Pocket Inc.
 github.com/PocketInc/Pocket-Browser
 */

// Modules to control application life and create native browser window
const {app, BrowserWindow, Notification} = require('electron')
const path = require('path')
const { dialog } = require('electron')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    //default width and height of electron window
    width: 800,
    height: 600,
    webPreferences: {
      //allow node integration
      //allows node to work in HTML and JS files.
      nodeIntegration: true,
      webviewTag: true,
      nativeWindowOpen: true

    }
  })

  // load the index.html of the app.
  mainWindow.loadFile('index.html')
  // remove the default electronjs menu
  mainWindow.setMenu(null)

  //BETA
// Download Manager
//currently, only prompts where and saves.
//TODO: add ability to pause, resume and stop.
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
var file = item.getFilename();
    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        const options = {
          icon: "b-icon.png",
          type: 'question',
          buttons: ['Cancel', 'Pause', 'Retry'],
          defaultId: 2,
          title: 'Download Interrupted!',
          message: 'Error occured while downloading ' + file,
          detail: '',
        };

        dialog.showMessageBox(null, options, (response, checkboxChecked) => {
          console.log(response);

        });

      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          var progress = item.getReceivedBytes() / item.getTotalBytes();
          mainWindow.setProgressBar(progress)
          console.log(`Received bytes: ${item.getReceivedBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        const options = {
          icon: "b-icon.png",
          type: 'question',
          buttons: ['Ok'],
          defaultId: 2,
          title: 'Download Successful!',
          message: file + " Is Downloaded Successfully!",
          detail: '',
        };

        dialog.showMessageBox(null, options, (response, checkboxChecked) => {
          console.log(response);

        });
      } else {
        const options = {
          icon: "b-icon.png",
          type: 'question',
          buttons: ['Cancel', 'Retry'],
          defaultId: 2,
          title: 'Download Failed!',
          message: 'Error occured while downloading ' + file,
          detail: '',
        };

        dialog.showMessageBox(null, options, (response, checkboxChecked) => {
          console.log(response);

        });
      }
    })
  })
  //--
  //BETA
  //window.open compatibility
  //TODO: Fix window open compatibility.

  //NOT WORKING
  // - Pocket Team.


  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    event.preventDefault();
    const popupWindow = new BrowserWindow({
      //default width and height of electron window
      width: 600,
      height: 400,
    })
    popupWindow.loadURL(url);
    popupWindow.setMenu(null);
  })
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
  app.allowRendererProcessReuse=false;
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})
