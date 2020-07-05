
log.info("Loading system")
function isSystemPage(url) {
    if (url.slice(0, 9).toLowerCase() === "pocket://") {
        log.info("System page is detected by function")
        return true;
        
    }

}
function openSystemPage(page) {
    
    log.info("Loading system page: " + page);
    const systemPage = new electron.BrowserWindow({
        //default width and height of electron window
        width: 600,
        height: 400,
        webPreferences: {
          //allow node integration
          //allows node to work in HTML and JS files.
          nodeIntegration: true,
          
        }
      })

    systemPage.loadFile("system/" + page + ".html");
    systemPage.setMenu(null);
    systemPage.title("Pocket Browser " + page)
    //systemPage.webContents.openDevTools();

}
function loadSystemPage(page) {
    document.getElementById("address").value = "pocket://" + page;
    loadURL();

}

