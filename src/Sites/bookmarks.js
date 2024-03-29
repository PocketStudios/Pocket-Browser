
function addBookmark() {
    let tab = tabGroup.getActiveTab();
    let name = tab.webview.getTitle();
    let url = tab.webview.src;
    let newData;
    if (fs.existsSync(path.join(dataPath, "/bookmarks.json"))) {
        let current = fs.readFileSync(path.join(dataPath,"/bookmarks.json"));
        let json = JSON.parse(current);
        json[name] = url;
        newData = JSON.stringify(json)
    } else {
        newData = '{"' + name + '": "' + url + '"}'
    }
    fs.writeFileSync(path.join(dataPath, "/bookmarks.json"), newData);

}

function removeBookmark() {
    let tab = tabGroup.getActiveTab();
    let name = tab.webview.getTitle();
    let url = tab.webview.src;
    let newData;
    if (fs.existsSync(path.join(dataPath, "/bookmarks.json"))) {
        let current = fs.readFileSync(path.join(dataPath, "/bookmarks.json"));
        let json = JSON.parse(current);
        delete json[name]
        newData = JSON.stringify(json)
        fs.writeFileSync(path.join(dataPath, "/bookmarks.json"), newData);
    }

}
function checkBookmark() {
    let tab = tabGroup.getActiveTab();
    let name = tab.webview.getTitle();
    let url = tab.webview.src;
    if (fs.existsSync(path.join(dataPath, "/bookmarks.json"))) {
        let current = fs.readFileSync(path.join(dataPath, "/bookmarks.json"));
        let json = JSON.parse(current);
        if (json[name]) {
            return true;
        } else return false;
    } else return false;
}