const electron = require("electron").remote

console.log("Loading browser.js")
var webview = document.getElementById("view");
var state = document.getElementById("state");
var onlineState = true;

function goBack() {
if(webview.canGoBack()) {
console.log("Going back..")
webview.goBack();
changeAddress();
}
}
function goForward() {
    if(webview.canGoForward()) {
console.log("Going forward..")
    webview.goForward();
    changeAddress();
    }
}
function goHome() {
    console.log("Going home..")
    webview.src = "https://duck.com";
}
function reloadPage() {
    webview.reload();
}
function changeFavicon(event) {
    console.log("Changing favicon..")
        document.getElementById("favicon").src = event.favicons[0];
    document.getElementById("favicon").hidden = false;
      
   //  document.getElementById("favicon").hidden = true;
      
    

}
function changeTitle() {
    console.log("Changing title")
    var viewTitle = webview.getTitle();
    if (viewTitle === "") {
        electron.getCurrentWindow().title = webview.src + " - Pocket Browser";
    } else {
    electron.getCurrentWindow().title = viewTitle + " - Pocket Browser"
    }
}
function loadDev() {
    console.log("toggling dev tools")
    if (webview.isDevToolsOpened()) {
        webview.closeDevTools();
    } else {
        webview.openDevTools();
    }
}
function wentOffline() {
    onlineState=false;
    loadSystemPage("connection")


}
function backOnline() {
    if (onlineState === false) {
    goBack();
    }
}

var loadingSystemPage = false;
function loadURL() {
    var url = document.getElementById("address").value;  

    if (isSystemPage(url)) {
console.log("System Page Detected");
loadingSystemPage=true;
openSystemPage(url.slice(9).toLowerCase());
    } else {
        let https = url.slice(0, 8).toLowerCase();
    let http = url.slice(0, 7).toLowerCase();
    let file = url.slice(0, 8).toLowerCase();
    if (https === "https://") {
  
        loadingSystemPage=false;
        webview.src = url;
    } else if (http === "http://") {
  
        loadingSystemPage=false;
        webview.src = url;
    } else if (file === "file:///") {
        loadingSystemPage=false;
        webview.src = url;
} else {
        loadingSystemPage=false;
        webview.src = "https://" + url;
    }

    console.log("Non-System Page Detected")
    }
}
function changeAddress() {
    if (loadingSystemPage === true) {
        console.log("No changing address");
        loadingSystemPage=false;
        document.getElementById("state").hidden = true
    } else {    
        if (webview.src.slice(0, 7) === "http://") {
        let myNotification = new Notification('In-Secure Webpage', {
  body: "Don't write any personal information.",
  icon: "s-icon.png"
})

        }
        console.log("Changing address..")
    document.getElementById("address").value = webview.src;
    document.getElementById("state").hidden = true
    changeTitle()
    }
    document.getElementById("reload").className = "btn btn-light";
}
function changeState() {
    document.getElementById("state").hidden = false;
    document.getElementById("reload").className = "btn btn-light disabled";
}
webview.addEventListener('did-finish-load', changeAddress);

webview.addEventListener('did-start-loading', changeState);

webview.addEventListener("page-favicon-updated",changeFavicon)

window.addEventListener('online',  backOnline)
window.addEventListener('offline', wentOffline)


var input = document.getElementById("address");

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("go").click();
  }
});