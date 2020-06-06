function getSettings() {
    var fs = require("fs");
         
    var jsonEngine = fs.readFileSync("data/engine.json", 'utf8');
    
    var jsEngine = JSON.parse(jsonEngine);

    document.getElementById("currentEngine").innerHTML += jsEngine.url;


alert("settings done")
}
function changeSearchEngine() {
var newEngine = document.getElementById("engine").value;
    var fs = require("fs");

        fs.writeFileSync("data/engine.json", JSON.stringify(newEngine));
        alert("done")
}
