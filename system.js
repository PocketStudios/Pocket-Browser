console.log("Loading system.js")
function isSystemPage(url) {
    var urlCut = url.slice(0, 9).toLowerCase();
    if (urlCut === "pocket://") {
        console.log("System page is detected by function")
        return true;
        
    }

}
function openSystemPage(page) {
    
    console.log("Loading system page: " + page);
var webview = document.getElementById("view");
webview.src = "system/" + page + ".html";
document.getElementById("address").value = "pocket://" + page;
document.getElementById("state").hidden = "true";
changeTitle();
document.getElementById("favicon").src = "system/favicon.ico"
}
function loadSystemPage(page) {
    document.getElementById("address").value = "pocket://" + page;
    loadURL();

}

