const linebyline = require("line-by-line");
const lbl = require("line-by-line");
let searchEngines = ["https://google.com/search?q=%s", "https://duckduckgo.com/%s", "https://bing.com/search?q=%s"]

function setSearchEngine(option) {
    if (searchEngines.length > option) {
        require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/search.pocket"), searchEngines[option])
    }
    searchEngineModal.classList.remove("is-active")
}

function setOtherSearchEngine(value) {
    require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/search.pocket"), value)
    searchEngineModal.classList.remove("is-active")

}

// Home Page
let homepages = ["pocket://new", "https://google.com/", "https://duckduckgo.com", "https://bing.com/"]

function setHomePage(option) {
    console.log(option)
    if (homepages.length > option) {
        require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/home.pocket"), homepages[option])
    }
    homePageModal.classList.remove("is-active")

}

function setOtherHomePage(value) {
    require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/home.pocket"), value)
    homePageModal.classList.remove("is-active")
}

function setSecurityMode(option) {
    require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/security.pocket"), option.toString())
    securityModal.classList.remove("is-active")

}

let history = [];

function History() {
    if (!require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/history.pocket"))) Swal.fire({
        title: 'History',
        html: "<p>Empty!</p>",
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        showConfirmButton: false,
    })
    let lbl = require("line-by-line");
    let lr = new lbl(require("path").join(require("@electron/remote").app.getPath("userData"), "/history.pocket"));
    let html = "<input id='term' onchange='findHistory(this)' class='input mb-3' placeholder='Search History'><button class='button is-danger'>Clear</button><table class='table is-fullwidth'><thead><tr><th>URL</th><th>Actions</th></tr></thead><tbody id='historyTable'>";
    lr.on("line", function (line) {
        history.push(line);
        if (line.length > 50) {
            line = line.substring(0, 50) + "..."
        }
        html += "<tr><th>" + line + "</th><td><button class='button is-primary' onclick='loadHistory(" + (history.length - 1) + ")'>Open</button> </td></tr>";
    })
    lr.on("end", function () {
        html += "</tbody></table>";

        Swal.fire({
            title: 'History',
            html: html,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            showConfirmButton: false,
            width: "75%",
        })
    })
}

function loadHistory(index) {
    let url = history[index];
    Swal.close();
    addTab(url);
}

function findHistory(e) {
    let term = e.value;
    results = 0;
    document.getElementById("historyTable").innerHTML = "";
    history.filter(item => item.includes(term)).forEach(function (item) {
        if (item.length > 50) {
            item = item.substring(0, 50) + "..."
        }
        document.getElementById("historyTable").innerHTML += "<tr><th>" + item + "</th><td><button class='button is-primary' onclick='loadHistory(" + i + ")'>Open</button> </td></tr>";
        results++;
    })

}

let bookmarks = [];

function Bookmarks() {
    if (!require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/bookmarks.json"))) Swal.fire({
        title: 'Bookmarks',
        html: "<p>Empty!</p>",
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        showConfirmButton: false,
    })
    let bookmarksJson = require("fs").readFileSync(require("path").join(require("@electron/remote").app.getPath("userData"), "/bookmarks.json"));
    let html = "<input id='term' onchange='findBookmark(this)' class='input mb-3' placeholder='Search Bookmark'><button class='button is-danger'>Clear</button><table class='table is-fullwidth'><thead><tr><th>Name</th><th>URL</th><th>Actions</th></tr></thead><tbody id='bookmarkTable'>";
    let json = JSON.parse(bookmarksJson);
    for (let i = 0; i < (Object.keys(json).length + 1); i++) {
        if (Object.keys(json).length > i) {
            let name = Object.keys(json)[i];
            let line = json[name];
            bookmarks.push({name: name, url: json[name]});
            if (line.length > 50) {
                line = line.substring(0, 50) + "..."
            }
            html += "<tr><th>" + name + "</th><th>" + line + "</th><td><button class='button is-primary' onclick='loadBookmark(" + (bookmarks.length - 1) + ")'>Open</button> </td></tr>";
        } else {
            html += "</tbody></table>";
            Swal.fire({
                title: 'Bookmarks',
                html: html,
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                showConfirmButton: false,
                width: "75%",
            })
        }
    }
}

function loadBookmark(index) {
    let url = bookmarks[index].url;
    Swal.close();
    addTab(url);
}

function findBookmark(e) {
    let term = e.value;
    results = 0;
    document.getElementById("bookmarkTable").innerHTML = "";
    bookmarks.filter(item => item.url.includes(term) || item.name.includes(term)).forEach(function (item) {
        if (item.length > 50) {
            item = item.substring(0, 50) + "..."
        }
        let name = item.name;
        let line = item.url;
        document.getElementById("bookmarkTable").innerHTML += "<tr><th>" + name + "</th><th>" + line + "</th><td><button class='button is-primary' onclick='loadBookmark(" + (bookmarks.length - 1) + ")'>Open</button> </td></tr>";
        results++;
    })

}

// pocket.resetSettings = async function () {
//     let value = document.getElementById('resetsettings').value;
//     if (value == 0) return;
//     if (confirm("Are you sure?") === false) return document.getElementById('resetsettings').value = 0;
//     if (value == 1) {
//         require("@electron/remote").session.defaultSession.clearStorageData([], function () {
//         }).then(function () {
//             alert("Cleared Successfully.")
//         })
//     } else if (value == 2) {
//         await require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/history.pocket"),"")
//         alert("Cleared Successfully.");
//     } else if (value == 3) {
//         await require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/bookmarks.json"),"{}")
//         alert("Cleared Successfully.");
//     } else if (value == 4) {
//         if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/search.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/search.pocket"))
//         if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/home.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/home.pocket"))
//         if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/errors.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/errors.pocket"))
//         if (require("fs").existsSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/security.pocket"))) require("fs").unlinkSync(require("path").join(require("@electron/remote").app.getPath("userData"),"/security.pocket"))
//
//         alert("Resetted Successfully.");
//     }
//     document.getElementById('resetsettings').value = 0;
// }
// pocket.toggleExtension = function (extension,element) {
//     let elm = document.getElementById(element);
//     if (elm.checked) {
//         require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),extension + ".pocket"),"true")
//     } else {
//         require("fs").writeFileSync(require("path").join(require("@electron/remote").app.getPath("userData"),extension + ".pocket"),"false")
//     }
// }
