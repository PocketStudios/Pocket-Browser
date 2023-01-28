let searchEngines = ["https://google.com/search?q=%s", "https://duckduckgo.com/%s", "https://bing.com/search?q=%s"]

function setSearchEngine(option) {
    if (searchEngines.length > option) {
        require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/search.pocket"), searchEngines[option])
    }
    searchEngineModal.classList.remove("is-active")
}

function setOtherSearchEngine(value) {
    require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/search.pocket"), value)
    searchEngineModal.classList.remove("is-active")

}

// Home Page
let homepages = ["pocket://new", "https://google.com/", "https://duckduckgo.com", "https://bing.com/"]

function setHomePage(option) {
    console.log(option)
    if (homepages.length > option) {
        require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/home.pocket"), homepages[option])
    }
    homePageModal.classList.remove("is-active")

}

function setOtherHomePage(value) {
    require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/home.pocket"), value)
    homePageModal.classList.remove("is-active")
}

function setSecurityMode(option) {
    require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/security.pocket"), option)
    securityModal.classList.remove("is-active")

}

// pocket.resetSettings = async function () {
//     let value = document.getElementById('resetsettings').value;
//     if (value == 0) return;
//     if (confirm("Are you sure?") === false) return document.getElementById('resetsettings').value = 0;
//     if (value == 1) {
//         require("@electron/remote").session.defaultSession.clearStorageData([], function () {
//         }).then(function () {
//             alert("Cleared Successfully.")
//         })
//     } else if (value == 2) {
//         await require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/history.pocket"),"")
//         alert("Cleared Successfully.");
//     } else if (value == 3) {
//         await require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/bookmarks.json"),"{}")
//         alert("Cleared Successfully.");
//     } else if (value == 4) {
//         if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/search.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/search.pocket"))
//         if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/home.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/home.pocket"))
//         if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/errors.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/errors.pocket"))
//         if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/security.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/security.pocket"))
//
//         alert("Resetted Successfully.");
//     }
//     document.getElementById('resetsettings').value = 0;
// }
// pocket.toggleExtension = function (extension,element) {
//     let elm = document.getElementById(element);
//     if (elm.checked) {
//         require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),extension + ".pocket"),"true")
//     } else {
//         require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),extension + ".pocket"),"false")
//     }
// }
