let pocket = {};
let linebyline  = require("line-by-line")
pocket.search = function () {
let term = document.getElementById('search').value;
let searchEngine = require("fs").readFileSync(require("@electron/remote").app.getPath("userData") + "/search.pocket","utf8");
searchEngine = searchEngine.replace("%s",encodeURI(term));
window.open(searchEngine,"_current")
}
pocket.load = function (value) {
    console.log(value)
    window.open(pocket.history[value],"_current")
}
pocket.history = [];
window.addEventListener('load',function () {
    document.getElementById('go').addEventListener('click', pocket.search)
    let readHistory = new linebyline(require("@electron/remote").app.getPath('userData') + "/history.pocket");
    let nbOfLines = 0;
    readHistory.on("line", function (line) {
        if (nbOfLines==4) readHistory.close();
        pocket.history.push(line)
        let title = line.indexOf('www.')+4 || line.indexOf("http://")+7 || line.indexOf("https://")+8 || 0;
        if (line.length > 5) title = line.slice(title,title+6)
        else title = line;
        document.getElementById('items').innerHTML += '<div id="pocket-' + nbOfLines + '" class="item"><img style="animation: unset;border:0;margin-bottom: 10px" src="../../../node_modules/bootstrap-icons/icons/file-earmark-image.svg"><br> ' + title + '</div>\n'
        nbOfLines++;
    })
    readHistory.on("end",function () {
        for (let i=0;i<pocket.history.length;i++) {
            document.getElementById("pocket-" + i).addEventListener("click", function (){
                pocket.load(i)
            })
        }
    })
})