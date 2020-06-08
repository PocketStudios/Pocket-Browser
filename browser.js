const electron = require("electron").remote
const fs = require("fs");
const log = require('electron-log');

  var homePage;
  goHome();

  log.info("Starting browser..")
var webview = document.getElementById("view");
var onlineState = true;

function goBack() {
if(webview.canGoBack()) {
    log.info("Going back on request.")
webview.goBack();
changeAddress();
}
}
function goForward() {
    if(webview.canGoForward()) {
        log.info("Going forward on request.")
            webview.goForward();
    changeAddress();
    }
}
function goHome() {
    log.info("Going home on request.")
        fs.readFile('./system/data/home.pocket', function (err, data) {
        if (err) {
            log.error("couldn't read file: ./system/data/home.pocket: " + err)
          throw err; 
        }
       homePage=data;
       webview.src = homePage;
       log.info("Loading successfull")
    
      });
}
function reloadPage() {
    log.info("Reloading on request..")
    webview.reload();
}
function changeFavicon(event) {
    log.info("Favicon changed")
        document.getElementById("favicon").src = event.favicons[0];
    document.getElementById("favicon").hidden = false;
      
   //  document.getElementById("favicon").hidden = true;
      
    

}
function changeTitle() {
    log.error("Title changed.")
    var viewTitle = webview.getTitle();
    if (viewTitle === "") {
        electron.getCurrentWindow().title = webview.src + " - Pocket Browser";
    } else {
    electron.getCurrentWindow().title = viewTitle + " - Pocket Browser"
    }
}
function loadDev() {
    log.info("Toggling DevTools from " + webview.isDevToolsOpened() + " to " + !webview.isDevToolsOpened())
    if (webview.isDevToolsOpened()) {
        webview.closeDevTools();
    } else {
        webview.openDevTools();
    }
}
function wentOffline() {
    log.warn("Connection lost.")
    onlineState=false;
    loadSystemPage("connection")


}
function backOnline() {
    if (onlineState === false) {
      log.warn("Connection is back.")  
    goBack();
    onlineState=true;
    }
}

var loadingSystemPage = false;
function loadURL() {
    var url = document.getElementById("address").value;  

    if (isSystemPage(url)) {
log.info("Loading system page: " + url);
loadingSystemPage=true;
openSystemPage(url.slice(9).toLowerCase());
    } else {
        log.info("Attempting to load URL: " + url);
    if (url.slice(0, 8).toLowerCase() === "https://") {
        log.info("Loading via HTTPS")
        loadingSystemPage=false;
        webview.src = url;
    } else if (url.slice(0, 7).toLowerCase() === "http://") {
        log.info("Loading via HTTP")
        loadingSystemPage=false;
        webview.src = url;
    } else if (url.slice(0, 8).toLowerCase() === "file:///") {
        log.info("Loading local file")
        loadingSystemPage=false;
        webview.src = url;
} else {
    log.info("Loading via Search.")
        loadingSystemPage=false;
fs.readFile('./system/data/engine.pocket', function (err, data) {
    if (err) {
        log.error("Couldn't read file: ./system/data/engine.pocket: " + err)
      throw err; 
    }
    webview.src = String(data).replace("%s",url);
    log.error("Loading successfull!")
  });
    }

    
    }
}
function changeAddress() {
    if (loadingSystemPage === true) {
        log.info("No changing address. system page.")
        loadingSystemPage=false;
        document.getElementById("state").hidden = true
    } else {    
        if (webview.src.slice(0, 7) === "http://") {
        let myNotification = new Notification('In-Secure Webpage', {
  body: "Don't write any personal information.",
  icon: "s-icon.png"
})
log.info("Sent notification due to insecure page.")

        }
        log.info("Changing address. normal URL.")
    document.getElementById("address").value = webview.src;
    document.getElementById("state").hidden = true
    changeTitle()
    }
    document.getElementById("reload").className = "btn btn-light";
}
function changeState() {
    log.info("Changing reloading state to: true")
    document.getElementById("state").hidden = false;
    document.getElementById("reload").className = "btn btn-light disabled";
}
webview.addEventListener('did-finish-load', changeAddress);

webview.addEventListener('did-start-loading', changeState);

webview.addEventListener("page-favicon-updated",changeFavicon)

window.addEventListener('online',  backOnline)
window.addEventListener('offline', wentOffline)

document.getElementById("address").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      log.info("Enter is clicked inside Input URL")
    event.preventDefault();
    document.getElementById("go").click();

  }
});