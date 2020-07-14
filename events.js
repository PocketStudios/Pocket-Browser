const contextMenu = require('electron-context-menu'); //require context menu module.


//Function to easily add and modify tab events.

function addEventsToTab(targetTab,home) {
    if (home !== true) {
        targetTab.webview.src = homePage;
    }

    targetTab.webview.addEventListener("dom-ready",function () {
        //USER AGENT:
        //BETA
        // change useragent to Pb's official user agent.
        var newAgent = targetTab.webview.getUserAgent().replace(" Electron/" + process.versions['electron'],"")
        targetTab.webview.setUserAgent(newAgent)

        //active the tab.
targetTab.activate();

    contextMenu({
        window: targetTab.webview,
        showCopyImageAddress: true,
        showSaveImage: true,
        showSearchWithGoogle: false,
        showInspectElement: true,
        prepend: (defaultActions, params, browserWindow) => [
            {
                label: 'Open link in new tab',
                // Only show it when right-clicking images
                visible: params.linkURL,
                click: () => {
                    addTab(params.linkURL)
                }
            },
            {
                label: 'Search Web for {selection}',
                // Only show it when right-clicking text
                visible: params.selectionText.trim().length > 0,
                click: () => {
                    fs.readFile(__dirname + '/system/data/engine.pocket', function (err, data) {
                        if (err) {
                            log.error("Couldn't read file: ./system/data/engine.pocket: " + err)
                            throw err;
                        }
                        addTab(String(data).replace("%s",encodeURIComponent(params.selectionText)));
                        log.info("Searched via search engine: " + data)
                    });

                }
            }
        ]
    });
    })
// when page finishes loading, run changeAddress functiion.
    targetTab.webview.addEventListener('did-finish-load',function(){
        changeAddress(targetTab)
    });
    // when page favicon is updated, run change favicon function.
    targetTab.webview.addEventListener("page-favicon-updated",function () {
        changeFavicon(event,targetTab);
    })
    // when page starts loading run change state function.
    targetTab.webview.addEventListener('did-start-loading', function(){
        changeState(targetTab);
    });
    // when page title is updated, then run change title function.
    targetTab.webview.addEventListener('page-title-updated', function(){
        log.info("title change attempt")
        changeTitle(targetTab,event)
    })


}
//Other Events

//Offline / Online
window.addEventListener('online',  backOnline)
window.addEventListener('offline', wentOffline)


//Add new tab when there's no tabs.
tabGroup.on("tab-removed", (functionTab, tabGroup) => {
    if (tabGroup.getTabs().length > 0) {
        log.info("Closed a tab, but there's still more tabs..");
    } else {
        log.info("Closed all tabs.");
        addTab();
    }


});
//open the url when enter is clicked in text input
document.getElementById("address").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        log.info("Enter is clicked inside Input URL")
        event.preventDefault();
        document.getElementById("go").click();

    }
});

// change title and address value when a new tab is activated.
tabGroup.on("tab-active", (tab, tabGroup) => {
    webview = tab.webview;
    document.getElementById("address").value = tab.webview.src;
    electron.getCurrentWindow().title = tab.webview.getTitle() + " - Pocket Browser";
});

// keyboard shortcuts.
// BETA. and will be changed.
//TODO: Needs remake or just add other shortcuts.
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        if (event.key === "t") {
            addTab();
        } else if (event.key === "n") {
            addWindow();
        } else if (event.key === "w") {
            tabGroup.getActiveTab().close();
        } else if (event.altKey && event.key === "s") {
            openSystemPage("settings");
        } else if (event.key === 'j') {
            openSystemPage("downloads")
        }
    }
});