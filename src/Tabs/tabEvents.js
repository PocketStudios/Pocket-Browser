function addEvents(tab) {
    const domready = emittedOnce(tab.webview, "dom-ready");
    Promise.all([domready]).then(() => {
        var newAgent = tab.webview.getUserAgent().replace(" Electron/" + process.versions['electron'], "").replace("pocket-browser/1.7.0", "Edg/91.0.831.1")
        tab.webview.setUserAgent(newAgent)
        tab.webview.addEventListener('did-finish-load', function () {
        changeState(0)
        darkWebsite()
        });
// when page favicon is updated, run change favicon function.
        tab.webview.addEventListener("page-favicon-updated", function () {
            tabFavicon(event, tab);
        })
// when page starts loading run change state function.
        tab.webview.addEventListener('did-start-loading', function () {
            changeState(1)
             changeSecure()
        });
// when page title is updated, then run change title function.
        tab.webview.addEventListener('page-title-updated', function (event) {
            changeTitle(tab,event)
        })
        tab.webview.addEventListener('did-fail-load', function (event) {
            if (event.errorCode == -3) return;
            loadErrorModal(event.errorCode)
        })
        tab.webview.addEventListener("update-target-url", function (event) {
            if (event.url == "") {
                return document.getElementById("target-url").hidden = "hidden"
            } else if (event.url.length > 60) {
                document.getElementById("target-url").innerHTML = "<small>" + event.url.slice(0, 100) + "...</small>";

            } else {
                document.getElementById("target-url").innerHTML = "<small>" + event.url + "</small>";
            }
            document.getElementById("target-url").hidden = ""

        })

        tab.webview.addEventListener("did-navigate", function (event) {
            event.preventDefault();
            changeURL(tab, event);
            darkWebsite()
             changeSecure()
        })
        tab.webview.addEventListener("did-navigate-in-page", function (event) {
             changeURL(tab, event);
             darkWebsite()
             changeSecure()
        })
        tab.webview.addEventListener("new-window", function (window) {
            window.preventDefault();
            addTab(window.url)
        })
        tab.webview.addEventListener('close', function () {
            tab.close();
        })
        require("@electron/remote").webContents.fromId(tab.webview.getWebContentsId()).on("context-menu",function (event,props) {
            event.preventDefault();
            buildMenu(props)
        })

        tab.on("active",function () {
            if (tab.loadingSystemPage) {
                document.getElementById('address').value = "pocket://" + tab.loadingSystemPage
            } else {
                document.getElementById('address').value = tab.webview.src;
            }
            // changeSecure()
        })
        require("@electron/remote").webContents.fromId(tab.webview.getWebContentsId()).on('before-input-event', (event, input) => {
           shortcuts(input)
        })
    })
}
require("@electron/remote").getCurrentWindow().webContents.on('before-input-event',(event,input) => {
    shortcuts(input)
})

const emittedOnce = (element, eventName) => new Promise(resolve => {
    element.addEventListener(eventName, event => resolve(event), {once: true})
})