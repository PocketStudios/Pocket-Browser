const fs = require('fs');
var dataPath = require("electron").remote.app.getPath("userData");
window.onload = function() {

    fs.readFile(dataPath + '/data/security.pocket', function (err, data) {
        if (err) {
            console.error("Error " + err + ": /userData/data/security.pocket");
            data = "1";
        }
        try {
        if (data == "0") {
        document.getElementById('basic').style.backgroundColor = "darkslategrey";
        document.getElementById('basic').style.color = "lightskyblue";

        document.getElementById('info').innerHTML = "<ul>\n<li>Loads all insecure pages.</li>\n<li>Security warnings are enabled.</li>\n<li>Allows unencrypted connections.</li>\n</ul>";
        } else if (data == "1") {
            document.getElementById('balanced').style.backgroundColor = "darkslategrey";
            document.getElementById('balanced').style.color = "lightskyblue";

            document.getElementById('info').innerHTML = "<ul>\n<li>Asks before loading insecure pages.</li>\n<li>Security warnings are enabled.</li>\n<li>Asks before allowing unencrypted connections.</li>\n</ul>"
        } else if (data == "2") {
            document.getElementById('strict').style.backgroundColor = "darkslategrey";
            document.getElementById('strict').style.color = "lightskyblue";

            document.getElementById("info").innerHTML = "<ul>\n<li>Prevents insecure pages.</li>\n<li>Security warnings are enabled.</li>\n<li>Prevents unencrypted connections.</li>\n</ul>"
        }
        } catch(err) {
            console.error("Error " + err + ": inserting current security mode.");
        }
    });



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

    require("electron").remote.getCurrentWindow().reload();
}
