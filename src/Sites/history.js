var fullHistory = [];
let linebyline = require("line-by-line");
const fs = require("fs");

var dataPath = require("@electron/remote").app.getPath("userData");

function checkHistory(text) {
    var bool = false;

    if (!fs.existsSync(dataPath + "/history.pocket")) {
        fs.writeFileSync(dataPath + "/history.pocket", text + "\n")
    } else {
        var fileLbl = new linebyline(dataPath + "/history.pocket");
        fileLbl.on("line", function (line) {
            if (text === line) {
                bool = true;
            }
        })
        fileLbl.on("end", function () {
            if (bool === false) {
                let oldHistory = fs.readFileSync(dataPath + "/history.pocket","utf8");
                fs.writeFileSync(dataPath + "/history.pocket",text + "\n" + oldHistory)
            }
        })
    }
}
function getHistory() {

    var dataPath = require("@electron/remote").app.getPath("userData");

    const fileRead = new linebyline(dataPath + "/history.pocket")
    let size = 0;

    fileRead.on("line", function (line) {
        fullHistory[size] = {
            label: line,
            value: line
        }
        size++;
    })
}