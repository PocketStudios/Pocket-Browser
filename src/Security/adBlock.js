let { FiltersEngine, Request } = require('@cliqz/adblocker');
const engine = FiltersEngine.parse(fs.readFileSync(path.join(__dirname,'resources','easylist.txt'), 'utf-8'));
const privacyEngine = FiltersEngine.parse(fs.readFileSync(path.join(__dirname,'resources','easyprivacy.txt'),'utf-8'))
if (adBlock == "true" || vidDown == "true") {
    require("@electron/remote").session.defaultSession.webRequest.onBeforeRequest({urls: ["*://*/*"]}, function (details, callback) {
        if (details.resourceType == "media") {
            if (vidDown == "true") {
                let p = document.createElement('p');
                p.innerHTML = "<a href='" + details.url + "' download>Click</a> to download.";
                Swal.fire({
                    title: "Video Detected",
                    html: p,
                    showCancelButton: true,
                    showConfirmButton: false
                })
            }
        }
        if (adBlock == "true") {
            const {match} = engine.match(Request.fromRawDetails({
                type: details.resourceType,
                url: details.url,
            }));
            const {match2} = privacyEngine.match(Request.fromRawDetails({
                type: details.resourceType,
                url: details.url,
            }));
            if (match || match2) {
                callback({cancel: true})
            } else {
                callback({cancel: false})
            }
        }
    })
}