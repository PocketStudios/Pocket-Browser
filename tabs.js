
const {BrowserWindow} = require("electron").remote;
function addTab() {
    const newWindow = new BrowserWindow({
        //default width and height of electron window
        width: 800,
        height: 600,
        webPreferences: {
          //allow node integration
          //allows node to work in HTML and JS files.
          nodeIntegration: true,
          webviewTag: true,
          
        }
      })

      // load the index.html of the app.
  newWindow.loadFile('index.html')
  // remove the default electronjs menu
  newWindow.setMenu(null)

  log.info("Opening new tab.");
}