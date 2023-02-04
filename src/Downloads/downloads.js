let content = "";
function downloadsList() {
    content = "";
    for (let i = 0; i < Object.keys(Downloads).length; i++) {
        let Item = Downloads[Object.keys(Downloads)[i]];
        content += "<p>" + Item.getFilename() + " - <span id='state-" + i + "'>" + Item.getState() + "</span></p><br><progress id='progress-" + i + "' value='0' max='100'></progress><br><small id='download-" + i + "'>" + Math.floor(Item.getReceivedBytes() / 1000000) + "MB/" + Math.floor(Item.getTotalBytes() / 1000000) + "MB</small><br><button class='button is-warning mr-1' onclick='pauseDownload(" + i + ")' id='btn1-" + i + "'>Pause</button><button onclick='stopDownload(" + i + ")' id='btn-2-" + i + "' class='button is-danger'>Stop</button><hr style='width:100%;border-top: 1px solid black;'>";
        Item.on("updated", function (event, state) {
            if (document.getElementById('progress-' + i) == null) return;
            document.getElementById('progress-' + i).value = (Item.getReceivedBytes() * 100) / Item.getTotalBytes();
            document.getElementById("download-" + i).innerHTML = Math.floor(Item.getReceivedBytes() / 1000000) + "MB/" + Math.floor(Item.getTotalBytes() / 1000000) + "MB";
            document.getElementById('state-' + i).innerHTML = Item.getState()
            if (Item.isPaused()) {
                document.getElementById('state-' + i).innerHTML = "paused"
                document.getElementById('btn1-' + i).innerHTML = "Resume";
                document.getElementById('btn1-' + i).onclick = function () {
                    resumeDownload(i)
                };
            }
    })
    }
    let fullDiv = document.createElement("div");
    fullDiv.innerHTML = content;
    Swal.fire({
        title: "Downloads",
        html: fullDiv
    })
}
function pauseDownload(id) {
    if (!Downloads[Object.keys(Downloads)[id]]) return;
    Downloads[Object.keys(Downloads)[id]].pause()
}

function resumeDownload(id) {
    if (!Downloads[Object.keys(Downloads)[id]]) return;
    Downloads[Object.keys(Downloads)[id]].resume()
    document.getElementById("state-" + id).innerHTML = "progressing";
    document.getElementById('btn1-' + id).innerHTML = "Pause"
    document.getElementById('btn1-' + id).onclick = function () {pauseDownload(id)}

}

function stopDownload(id) {
    if (!Downloads[Object.keys(Downloads)[id]]) return;
    Downloads[Object.keys(Downloads)[id]].cancel()
    document.getElementById('state-' + id).innerHTML = "Canceled";
    delete Downloads[Object.keys(Downloads)[id]];
}