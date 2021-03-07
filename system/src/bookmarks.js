/*
 * &copy; 2021 - Pocket Inc.
 */
let fs = require("fs")
var dataPath = require("electron").remote.app.getPath("userData");

if (fs.existsSync(dataPath + "/data/bookmarks.json")) {
    let file = fs.readFileSync(dataPath + "/data/bookmarks.json");
    let bookmarks = JSON.parse(file)
    let bookmarksObj = Object.keys(bookmarks)
    if (bookmarksObj.length == 0) document.getElementById("bookmarks").innerHTML = "<p style='text-align:center'><small>No Bookmarks Yet!</small></p>"
    for (let i = 0; i < bookmarksObj.length; i++) {
        let url;
        if (bookmarks[bookmarksObj[i]].length > 50) url = bookmarks[bookmarksObj[i]].slice(0,50) + "..."
        else url = bookmarks[bookmarksObj[i]];
        let name;
        if (bookmarksObj[i].length > 50) name = bookmarksObj[i].slice(0,50) + "..."
        else name = bookmarksObj[i]
        document.getElementById("bookmarks").innerHTML = "<div style=\"border:1px solid #f8f9fa\">\n" +
            "    <a href='" + bookmarks[bookmarksObj[i]] + "' title='" + bookmarksObj[i] + "'>" + name + "</a> - \n <small>(" +
            url +
            ")</small><b style='float: right;'><button class='x' onclick='removeBookmark(" + i + ")'>x</b>" +
            "</div>" + document.getElementById("bookmarks").innerHTML;
    }


}
document.getElementById("bookmarks").addEventListener("click",function (event) {
    event.preventDefault();
})
function removeBookmark(nb) {
    let file = fs.readFileSync(dataPath + "/data/bookmarks.json");
    let bookmarks = JSON.parse(file)
    let bookmarksObj = Object.keys(bookmarks)
    bookmarks[bookmarksObj[nb]] = undefined;
    fs.writeFileSync(dataPath + "/data/bookmarks.json",JSON.stringify(bookmarks))
    location.reload()
}
