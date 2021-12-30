window.addEventListener('load',function () {

    try {
        // Load Settings
        pocket.loadSearchEngine();
        pocket.loadHomePage();
        pocket.loadSecurity();
        // Change Settings Events
        document.getElementById('searchengine').addEventListener('change',pocket.setSearchEngine)
        document.getElementById('other-searchengine-button').addEventListener('click',pocket.setOtherSearchEngine)

        document.getElementById('homepage').addEventListener('change',pocket.setHomePage)
        document.getElementById('other-homepage-button').addEventListener('click',pocket.setOtherHomePage)

        document.getElementById('securitymode').addEventListener('change',pocket.setSecurityMode)

        document.getElementById('pb-version').innerHTML = require("../../../package.json").version;
        document.getElementById('pb-chromium').innerHTML = process.versions['chrome']
        document.getElementById('pb-os').innerHTML = process.platform + " " + process.arch

    } catch(err) {
        console.error(err)
    }
})

let pocket = {};
let searchEngines = ["https://duckduckgo.com/%s","https://google.com/search?q=%s","https://bing.com/search?q=%s"]
pocket.setSearchEngine = function () {
    let searchEngineOption = document.getElementById('searchengine').value;
    if (searchEngineOption in searchEngines) {
        document.getElementById('other-searchengine').style = "display:none"
        require("fs").writeFileSync(require("@electron/remote").app.getPath("userData") + "/search.pocket",searchEngines[searchEngineOption])
    } else {
    document.getElementById("other-searchengine").style = "";
    }
}
pocket.setOtherSearchEngine = function () {
    let searchEngineValue = document.getElementById('other-searchengine-input').value;
    require("fs").writeFileSync(require("@electron/remote").app.getPath("userData") + "/search.pocket",searchEngineValue)
    alert("Saved Successfully.")
}
// Home Page
let homepages = ["pocket://new","https://duckduckgo.com","https://google.com/","https://bing.com/"]
pocket.setHomePage = function () {
    let homePageOption = document.getElementById('homepage').value;
    if (homePageOption in homepages) {
        document.getElementById('other-homepage').style = "display:none"
        require("fs").writeFileSync(require("@electron/remote").app.getPath("userData") + "/home.pocket",homepages[homePageOption])
    } else {
        document.getElementById("other-homepage").style = "";
    }
}
pocket.setOtherHomePage = function () {
    let homePageValue = document.getElementById('other-homepage-input').value;
    require("fs").writeFileSync(require("@electron/remote").app.getPath("userData") + "/home.pocket",homePageValue)
    alert("Saved Successfully.")
}
// security
pocket.setSecurityMode = function () {
    let securityMode = document.getElementById('securitymode').value;
        require("fs").writeFileSync(require("@electron/remote").app.getPath("userData") + "/security.pocket",securityMode)

}
//load settings
pocket.loadSearchEngine = function () {
    let searchEngine = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/search.pocket","utf8")
    if (searchEngines.includes(searchEngine)) {
        document.getElementById('searchengine').value = searchEngines.findIndex(value => value == searchEngine)
    } else {
        document.getElementById('searchengine').value = document.getElementById('searchengine').length-1;
        document.getElementById("other-searchengine").style = "";
        document.getElementById('other-searchengine-input').value = searchEngine

    }
}

pocket.loadHomePage = function () {
    let homePage = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/home.pocket","utf8")
    if (homepages.includes(homePage)) {
        document.getElementById('homepage').value = homepages.findIndex(value => value == homePage)
    } else {
        document.getElementById('homepage').value = document.getElementById('homepage').length-1;
        document.getElementById("other-homepage").style = "";
        document.getElementById('other-homepage-input').value = homePage

    }
}
pocket.loadSecurity = function () {
    let securityMode = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/security.pocket","utf8")
    document.getElementById('securitymode').value = securityMode;
}