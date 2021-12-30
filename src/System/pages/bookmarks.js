let dataPath = require("@electron/remote").app.getPath("userData")
let nbResults = 0;
window.addEventListener('load',function () {
    document.getElementById('term').addEventListener('change',find)
    let bookmarksJS = require("fs").readFileSync(dataPath + "/bookmarks.json","utf8");
    let bookmarks = JSON.parse(bookmarksJS)
        for (let page in bookmarks) {
            document.getElementById("bookmarks").innerHTML += "<a href='" + bookmarks[page] + "'>" + page + "</a><br>"
            nbResults++;
        }
    document.getElementById('results').innerHTML = "Found " + nbResults + " results."
})
function find() {
    let term = document.getElementById("term").value;
    document.getElementById('bookmarks').innerHTML = ""
    nbResults = 0;
    let bookmarksJS = require("fs").readFileSync(dataPath + "/bookmarks.json","utf8");
    let bookmarks = JSON.parse(bookmarksJS)
    for (let page in bookmarks) {
        if (bookmarks[page].includes(term) || page.includes(term)) {
            document.getElementById("bookmarks").innerHTML += "<a href='" + bookmarks[page] + "'>" + page + "</a><br>"
            nbResults++;
        }
    }
    document.getElementById('results').innerHTML = "Found " + nbResults + " results."

}

function removeBookmark(name) {
    let newData;
    if (fs.existsSync(dataPath + "/bookmarks.json")) {
        let current = fs.readFileSync(dataPath + "/bookmarks.json");
        let json = JSON.parse(current);
        delete json[name]
        newData = JSON.stringify(json)
        fs.writeFileSync(dataPath + "/bookmarks.json", newData);
    }

}