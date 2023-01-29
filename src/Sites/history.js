var fullHistory = [];
function checkHistory(text) {
    var bool = false;

    if (!fs.existsSync(path.join(dataPath,"/history.pocket"))) {
        fs.writeFileSync(path.join(dataPath, "/history.pocket"), text + "\n")
    } else {
        var fileLbl = new linebyline(path.join(dataPath,"/history.pocket"));
        fileLbl.on("line", function (line) {
            if (text === line) {
                bool = true;
            }
        })
        fileLbl.on("end", function () {
            if (bool === false) {
                let oldHistory = fs.readFileSync(path.join(dataPath, "/history.pocket"),"utf8");
                fs.writeFileSync(path.join(dataPath, "/history.pocket"),text + "\n" + oldHistory)
            }
        })
    }
}
function getHistory() {

    var dataPath = require("@electron/remote").app.getPath("userData");

    const fileRead = new linebyline(path.join(dataPath, "/history.pocket"));
    let size = 0;

    fileRead.on("line", function (line) {
        fullHistory[size] = {
            label: line,
            value: line
        }
        size++;
    })
}