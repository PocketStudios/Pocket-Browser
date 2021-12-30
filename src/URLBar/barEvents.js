window.addEventListener("load",function () {
document.getElementById("address").addEventListener('drop', function (event) {
    event.preventDefault();
    document.getElementById('address').value = event.dataTransfer.getData("Text")
})
document.getElementById("address").addEventListener('keydown', function (event) {
    if (event.key == "Escape") {
        event.preventDefault()
        document.getElementById("address").value = tabGroup.getActiveTab().webview.src;
    }
})
document.getElementById("address").addEventListener("click", function () {
    let electron = require("@electron/remote");
    electron.getCurrentWindow().webContents.selectAll()
})
// auto complete
let autocomplete = require("autocompleter")
autocomplete({
    minLength: 1,
    input: document.getElementById("address"),
    fetch: async function (text, update) {
        let website = text;
        text = text.toLowerCase();
        getHistory();
        suggestions = fullHistory.filter(n => n.label.toLowerCase().includes(text))
        for (let i = 0; i < suggestions.length; i++) {
            if (suggestions[i].label.length > 100 && text.length > 25) {
                suggestions[i].label = suggestions[i].label.slice(0, 100) + "..."
            } else if (suggestions[i].label.length > 50 && suggestions[i].label.length < 100 && text.length > 15) {
                suggestions[i].label = suggestions[i].label;
            } else {
                suggestions[i].label = suggestions[i].label.slice(0, 50) + "..."
            }
        }
        if (text.includes(".com") || text.includes(".net") || text.includes(".org") || text.includes("www.") || text.includes("http")) {
            suggestions.unshift(Object.create({
                label: website,
                value: website
            }));
        } else if (text.startsWith("pocket://")) {
            suggestions.unshift(Object.create({label: website + " - System Page", value: website}));
        } else if (text.startsWith("file:///")) {
            suggestions.unshift(Object.create({label: website + " - Local File", value: website}));
        } else {
            let searchEngine;
            if (fs.existsSync(dataPath + "/engine.pocket")) searchEngine = await fs.readFileSync(dataPath + '/engine.pocket');
            else searchEngine = "https://duck.com/%s";
            suggestions.unshift(Object.create({
                label: website + " - Search",
                value: String(searchEngine).replace("%s", website.replace(" ", "+"))
            }));

        }
        var str = website.replace(/[^-()\d/*+.]/g, '');
        try {
            if (!isNaN(eval(str))) {
                suggestions.unshift(Object.create({
                    label: "= " + eval(str),
                    value: "https://google.com/search?q=" + encodeURIComponent(website)
                }));
            }
        } catch (err) {
        }
        update(suggestions);

    },
    onSelect: function (item) {
        document.getElementById("address").value = item.value;
        document.getElementById("go").click();
    }
});
})