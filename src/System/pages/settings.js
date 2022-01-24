window.addEventListener('load',function () {

        // Load Settings
        pocket.loadSearchEngine();
        pocket.loadHomePage();
        pocket.loadSecurity();
        pocket.loadExtensions();
        // Change Settings Events
        document.getElementById('searchengine').addEventListener('change',pocket.setSearchEngine)
        document.getElementById('other-searchengine-button').addEventListener('click',pocket.setOtherSearchEngine)

        document.getElementById('homepage').addEventListener('change',pocket.setHomePage)
        document.getElementById('other-homepage-button').addEventListener('click',pocket.setOtherHomePage)

        document.getElementById('securitymode').addEventListener('change',pocket.setSecurityMode)

        document.getElementById('resetsettings').addEventListener('change',pocket.resetSettings)

        document.getElementById('adblock').addEventListener('change',function () {pocket.toggleExtension('ads','adblock')})
        document.getElementById('darkwebsite').addEventListener('change',function () {pocket.toggleExtension('dark','darkwebsite')})
        document.getElementById('vid-down').addEventListener('change',function () {pocket.toggleExtension('vid-down','vid-down')})

        document.getElementById('pb-version').innerHTML = require("../../../package.json").version;
        document.getElementById('pb-chromium').innerHTML = process.versions['chrome']
        document.getElementById('pb-os').innerHTML = process.platform + " " + process.arch

    
})

let pocket = {};
let searchEngines = ["https://duckduckgo.com/%s","https://google.com/search?q=%s","https://bing.com/search?q=%s"]
pocket.setSearchEngine = function () {
    let searchEngineOption = document.getElementById('searchengine').value;
    if (searchEngineOption in searchEngines) {
        document.getElementById('other-searchengine').style = "display:none"
        require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/search.pocket"),searchEngines[searchEngineOption])
    } else {
    document.getElementById("other-searchengine").style = "";
    }
}
pocket.setOtherSearchEngine = function () {
    let searchEngineValue = document.getElementById('other-searchengine-input').value;
    require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/search.pocket"),searchEngineValue)
    alert("Saved Successfully.")
}
// Home Page
let homepages = ["pocket://new","https://duckduckgo.com","https://google.com/","https://bing.com/"]
pocket.setHomePage = function () {
    let homePageOption = document.getElementById('homepage').value;
    if (homePageOption in homepages) {
        document.getElementById('other-homepage').style = "display:none"
        require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/home.pocket"),homepages[homePageOption])
    } else {
        document.getElementById("other-homepage").style = "";
    }
}
pocket.setOtherHomePage = function () {
    let homePageValue = document.getElementById('other-homepage-input').value;
    require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/home.pocket"),homePageValue)
    alert("Saved Successfully.")
}
// security
pocket.setSecurityMode = function () {
    let securityMode = document.getElementById('securitymode').value;
        require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/security.pocket"),securityMode)

}
//load settings
pocket.loadSearchEngine = function () {
	let searchEngine = "https://duckduckgo.com/%s";
		if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/search.pocket"),"utf8")) {
    searchEngine = require("fs").readFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/search.pocket"),"utf8")
    if (searchEngines.includes(searchEngine)) {
        document.getElementById('searchengine').value = searchEngines.findIndex(value => value == searchEngine)
    } else {
        document.getElementById('searchengine').value = document.getElementById('searchengine').length-1;
        document.getElementById("other-searchengine").style = "";
        document.getElementById('other-searchengine-input').value = searchEngine
    }
		} else {
        document.getElementById('searchengine').value = 0
    
		}
}

pocket.loadHomePage = function () {
	let homePage = "pocket://new";
	if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/home.pocket"),"utf8")) {
    homePage = require("fs").readFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/home.pocket"),"utf8")
    if (homepages.includes(homePage)) {
        document.getElementById('homepage').value = homepages.findIndex(value => value == homePage)
    } else {
        document.getElementById('homepage').value = document.getElementById('homepage').length-1;
        document.getElementById("other-homepage").style = "";
        document.getElementById('other-homepage-input').value = homePage
    }
	} else {
        document.getElementById('homepage').value = 0;
        
	}
}
pocket.loadSecurity = function () {
		if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/security.pocket"),"utf8")) {
    let securityMode = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/security.pocket","utf8")
    document.getElementById('securitymode').value = securityMode;
		} else {
			document.getElementById("securitymode").value = 1;
		}
}
pocket.resetSettings = async function () {
    let value = document.getElementById('resetsettings').value;
    if (value == 0) return;
    if (confirm("Are you sure?") === false) return document.getElementById('resetsettings').value = 0;
    if (value == 1) {
        require("@electron/remote").session.defaultSession.clearStorageData([], function () {
        }).then(function () {
            alert("Cleared Successfully.")
        })
    } else if (value == 2) {
        await require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/history.pocket"),"")
        alert("Cleared Successfully.");
    } else if (value == 3) {
        await require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/bookmarks.json"),"{}")
        alert("Cleared Successfully.");
    } else if (value == 4) {
        if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/search.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/search.pocket"))
        if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/home.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/home.pocket"))
        if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/errors.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/errors.pocket"))
        if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/security.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/security.pocket"))

        alert("Resetted Successfully.");
    }
    document.getElementById('resetsettings').value = 0;
}
pocket.toggleExtension = function (extension,element) {
    let elm = document.getElementById(element);
    if (elm.checked) {
        require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),extension + ".pocket"),"true")
    } else {
        require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),extension + ".pocket"),"false")
    }
}

pocket.loadExtensions = function () {
    if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/ads.pocket"),"utf8")) {
        let ads = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/ads.pocket","utf8")
        if (ads == "true") {
            document.getElementById('adblock').checked = true;
        } else document.getElementById('adblock').checked = false;
    } else {
        document.getElementById("adblock").checked = false;
    }
    if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/dark.pocket"),"utf8")) {
        let dark = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/dark.pocket","utf8")
        if (dark == "true") {
            document.getElementById('darkwebsite').checked = true;
        } else document.getElementById('darkwebsite').checked = false;
    } else {
        document.getElementById("darkwebsite").checked = false;
    }
    if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/vid-down.pocket"),"utf8")) {
        let viddown = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/vid-down.pocket","utf8")
        if (viddown == "true") {
            document.getElementById('vid-down').checked = true;
        } else document.getElementById('vid-down').checked = false;
    } else {
        document.getElementById("vid-down").checked = false;
    }
}
