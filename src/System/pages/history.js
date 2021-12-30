let linebyline = require("line-by-line");
let dataPath = require("@electron/remote").app.getPath("userData")
window.addEventListener('load',function () {
    document.getElementById('term').addEventListener('change',find)
    let readHistory = new linebyline(dataPath + "/history.pocket");
let results = 0;
readHistory.on("line",function (line) {
    let title = line;
    let url = line;
    results++;
    if (title.length > 50) title = line.slice(0,50) + "..."

    document.getElementById('history').innerHTML += "<a href='" + url + "'>" + title + "</a><br>"
})
    readHistory.on("end",function () {
        document.getElementById('results').innerHTML = "Found " + results + " results."
    })
})
function find() {
    let term = document.getElementById("term").value;
    document.getElementById('history').innerHTML = ""
    readHistory = new linebyline(dataPath + "/history.pocket");
    results = 0;
    readHistory.on("line",function (line) {
        if (line.includes(term)) {
            let title = line;
            let url = line;
            results++;
            if (title.length > 50) title = line.slice(0, 50) + "..."

            document.getElementById('history').innerHTML += "<a href='" + url + "'>" + title + "</a><br>"
        }
    })
    readHistory.on("end",function () {
        document.getElementById('results').innerHTML = "Found " + results + " results."
    })
}