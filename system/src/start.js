/*
Development
Bugs
 */
let fs = require("fs");
let dataPath = require('electron').remote.app.getPath("userData");
let page = 0;
function nextPage() {
    switch(page) {
        case 0:
            document.getElementById("title").innerHTML = "Search Engine";
            document.getElementById("content").innerHTML = "<select onchange='searchEngine()' id='searchengine'>\n<option disabled='disabled' selected>Select One</option>\n<option value='Google'>Google</option>\n<option value='DuckDuckGo'>DuckDuckGo</option>\n<option value='Bing'>Bing</option>\n</select><br><p id='changed'></p>"
            document.getElementById("btns").innerHTML = "<button style='float: right' onclick='nextPage()'>Next</button>";
            page++;
            break;
        case 1:
            document.getElementById('title').innerHTML = "Security Mode"
            document.getElementById('content').innerHTML = "\n" +
                "    <div class=\"container\">\n" +
                "    <div class=\"row\">\n" +
                "        <div class=\"col\">\n" +
                "            <button class=\"btn big-btn h-50\" id=\"basic\" onclick=\"changeMode(0)\"><img class=\"normal-img\" src=\"../node_modules/bootstrap-icons/icons/shield-exclamation.svg\" width=\"12\" height=\"12\"><br> Basic</button>\n" +
                "        </div>\n" +
                "        <div class=\"col\">\n" +
                "            <button class=\"btn big-btn\" id=\"balanced\" onclick=\"changeMode(1)\"><img class=\"normal-img\" src=\"../node_modules/bootstrap-icons/icons/shield.svg\" width=\"12\" height=\"12\"><br> Balanced</button>\n" +
                "        </div>\n" +
                "        <div class=\"col\">\n" +
                "            <button class=\"btn big-btn\" id=\"strict\" onclick=\"changeMode(2)\"><img class=\"normal-img\" src=\"../node_modules/bootstrap-icons/icons/shield-check.svg\" width=\"12\" height=\"12\"><br> Strict</button>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "        <div id=\"info\"></div>\n" +
                "    </div>"
            page++;
            break;
        case 2:
    document.getElementById("title").innerHTML = "Data Collecting";
    document.getElementById("content").innerHTML = "Do you want to allow us to collect error data?"
    document.getElementById("btns").innerHTML = "<button style='float: right' onclick='errorData(0)'>No</button>\n<button style='float: right;' onclick='errorData(1)'>Yes</button>"
            page++;
            break;
        case 3:
            document.getElementById("btns").innerHTML = "<button style='float: right' onclick='nextPage()'>Next</button>";
            document.getElementById("title").innerHTML = "Development"
            document.getElementById("content").innerHTML = "This browser is currently in development and more features will come at later updates, please do not judge now!"
            page++;
            break;
        case 4:
            document.getElementById("title").innerHTML = "Bugs";
            document.getElementById("content").innerHTML = "Found any bug? Report it to us!<br><br><a href='emailto:support@pocket-inc.ml'>support@pocket-inc.ml</a>"
            document.getElementById("btns").innerHTML = "<button style='float: right' onclick='window.close()'>Finish</button>"
    }
}

function errorData(state) {
    const fs = require("fs");
    let dataPath = require("electron").remote.app.getPath("userData");
    if (!fs.existsSync( dataPath + "/data")) fs.mkdirSync(dataPath + "/data");

    if (state === 0) {
        fs.writeFileSync(dataPath + "/data/errors.pocket","false")
    } else if (state === 1) {
        fs.writeFileSync(dataPath + "/data/errors.pocket","true")
    }
    nextPage();
}
async function searchEngine() {
    let engine = document.getElementById('searchengine').value;
    if (engine == "Google") {
      await fs.writeFileSync(dataPath + "/data/engine.pocket","https://google.com/search?q=%s");
    } else if (engine == "DuckDuckGo") {
        await fs.writeFileSync(dataPath + "/data/engine.pocket","https://duckduckgo.com/?q=%s");

    } else if (engine == "Bing") {
        await fs.writeFileSync(dataPath + "/data/engine.pocket","https://bing.com/search?q=%s");
    }
    document.getElementById('changed').innerHTML = "Changed to " + engine;
}

function changeMode(mode) {
    if (!fs.existsSync(dataPath + "/data")){
        fs.mkdirSync(dataPath + "/data");
    }
    fs.writeFile(dataPath + '/data/security.pocket', mode, function (err) {
        if (err) {
            throw err;
        }
    });

    if (mode == "0") {
        document.getElementById('basic').style.backgroundColor = "darkslategrey";
        document.getElementById('basic').style.color = "lightskyblue";

        document.getElementById('balanced').style.backgroundColor = "lightskyblue";
        document.getElementById('balanced').style.color = "darkslategrey";

        document.getElementById('strict').style.backgroundColor = "lightskyblue";
        document.getElementById('strict').style.color = "darkslategrey";

        document.getElementById('info').innerHTML = "<ul>\n<li>Loads all insecure pages.</li>\n<li>Security warnings are enabled.</li>\n<li>Allows unencrypted connections.</li>\n</ul>";
    } else if (mode == "1") {
        document.getElementById('basic').style.backgroundColor = "lightskyblue";
        document.getElementById('basic').style.color = "darkslategrey";

        document.getElementById('balanced').style.backgroundColor = "darkslategrey";
        document.getElementById('balanced').style.color = "lightskyblue";

        document.getElementById('strict').style.backgroundColor = "lightskyblue";
        document.getElementById('strict').style.color = "darkslategrey";

        document.getElementById('info').innerHTML = "<ul>\n<li>Asks before loading insecure pages.</li>\n<li>Security warnings are enabled.</li>\n<li>Asks before allowing unencrypted connections.</li>\n</ul>"
    } else if (mode == "2") {
        document.getElementById('basic').style.backgroundColor = "lightskyblue";
        document.getElementById('basic').style.color = "darkslategrey";

        document.getElementById('balanced').style.backgroundColor = "lightskyblue";
        document.getElementById('balanced').style.color = "darkslategrey";

        document.getElementById('strict').style.backgroundColor = "darkslategrey";
        document.getElementById('strict').style.color = "lightskyblue";

        document.getElementById("info").innerHTML = "<ul>\n<li>Prevents insecure pages.</li>\n<li>Security warnings are enabled.</li>\n<li>Prevents unencrypted connections.</li>\n</ul>"
    }
}
